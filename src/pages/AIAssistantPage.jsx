import { useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import { followUpPatients, statsData, todayAppointments } from '../data/mockData.js';
import usePreferences from '../hooks/usePreferences.js';

function fillTemplate(template, values) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

function getLocalAnswer(question, t) {
  const query = question.toLowerCase();
  const patient = followUpPatients.find((item) => query.includes(item.name.toLowerCase()));

  if (patient) {
    return fillTemplate(t.aiPatientSummary, {
      name: patient.name,
      progress: patient.progressPercent,
      week: patient.currentWeek,
      totalWeeks: patient.totalWeeks,
      medication: patient.medication
        ? fillTemplate(t.aiMedicationListed, { medication: patient.medication })
        : t.aiNoMedication,
    });
  }
  if (['adher', 'progress', 'adhésion', 'adhesion', 'التزام', 'تقدم'].some((word) => query.includes(word))) {
    return fillTemplate(t.aiAdherenceReply, { adherence: statsData.avgAdherence, count: followUpPatients.length });
  }
  if (['patient', 'count', 'combien', 'مرضى', 'مريض', 'عدد'].some((word) => query.includes(word))) {
    return fillTemplate(t.aiPatientCountReply, { count: statsData.totalPatients });
  }
  if (['appointment', 'today', 'rendez-vous', 'rdv', 'aujourd', 'موعد', 'مواعيد', 'اليوم'].some((word) => query.includes(word))) {
    const appointments = todayAppointments
      .map((item) => fillTemplate(t.aiAppointmentItem, { time: item.time, name: item.patientName }))
      .join('; ');
    return fillTemplate(t.aiAppointmentsReply, {
      count: statsData.sessionsToday,
      appointments: appointments || t.aiNoAppointments,
    });
  }
  if (['alert', 'alerte', 'تنبيه', 'تنبيهات'].some((word) => query.includes(word))) {
    return fillTemplate(t.aiAlertsReply, { count: statsData.alertsCount });
  }
  if (['report', 'rapport', 'تقرير', 'تقارير'].some((word) => query.includes(word))) {
    return fillTemplate(t.aiReportReply, {
      adherence: statsData.avgAdherence,
      patients: statsData.totalPatients,
      sessions: statsData.sessionsToday,
    });
  }
  return fillTemplate(t.aiFallbackReply, {
    patients: statsData.totalPatients,
    sessions: statsData.sessionsToday,
    adherence: statsData.avgAdherence,
    alerts: statsData.alertsCount,
  });
}

export default function AIAssistantPage() {
  const { t } = usePreferences();
  const [messages, setMessages] = useState([{ from: 'assistant', textKey: 'aiGreeting' }]);
  const [draft, setDraft] = useState('');

  function sendMessage(event) {
    event.preventDefault();
    const question = draft.trim();
    if (!question) return;
    setMessages((current) => [
      ...current,
      { from: 'doctor', text: question },
      { from: 'assistant', text: getLocalAnswer(question, t) },
    ]);
    setDraft('');
  }

  return (
    <section className="ai-assistant-page">
      <div className="ai-assistant-card">
        <header className="ai-assistant-header">
          <h1><Sparkles size={15} /> {t.aiAssistant}</h1>
          <span><Bot size={14} /></span>
        </header>

        <div className="ai-assistant-messages" aria-live="polite">
          {messages.map((message, index) => (
            <article key={`${message.from}-${index}`} className={`ai-assistant-message ${message.from}`}>
              <p>{message.textKey ? t[message.textKey] : message.text}</p>
            </article>
          ))}
        </div>

        <form className="ai-assistant-compose" onSubmit={sendMessage}>
          <input
            aria-label={t.askAssistant}
            placeholder={t.askAssistant}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <button type="submit" aria-label={t.sendQuestion} disabled={!draft.trim()}>
            <Sparkles size={16} />
            <Send className="ai-send-icon" size={14} />
          </button>
        </form>
      </div>
    </section>
  );
}
