import { useEffect, useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  MessageSquarePlus,
  Trash2,
  MessageSquare,
} from 'lucide-react';

import {
  followUpPatients,
  statsData,
  todayAppointments,
} from '../data/mockData.js';

import usePreferences from '../hooks/usePreferences.js';

const STORAGE_KEY = 'kineora_ai_conversations';

function createConversation() {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: '',
    updatedAt: new Date().toISOString(),
    messages: [{ from: 'assistant', textKey: 'aiGreeting' }],
  };
}

function loadChatState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed.conversations) && parsed.conversations.length > 0) {
        const conversations = parsed.conversations.filter(
          (conversation) =>
            conversation &&
            conversation.id &&
            Array.isArray(conversation.messages),
        );

        if (conversations.length > 0) {
          const activeId = conversations.some(
            (conversation) => conversation.id === parsed.activeId,
          )
            ? parsed.activeId
            : conversations[0].id;

          return { conversations, activeId };
        }
      }
    }
  } catch {
    // Start with a new conversation if saved data is invalid.
  }

  const firstConversation = createConversation();

  return {
    conversations: [firstConversation],
    activeId: firstConversation.id,
  };
}

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
  if (['adher', 'progress', 'adhÃ©sion', 'adhesion', 'Ø§Ù„ØªØ²Ø§Ù…', 'ØªÙ‚Ø¯Ù…'].some((word) => query.includes(word))) {
    return fillTemplate(t.aiAdherenceReply, { adherence: statsData.avgAdherence, count: followUpPatients.length });
  }
  if (['patient', 'count', 'combien', 'Ù…Ø±Ø¶Ù‰', 'Ù…Ø±ÙŠØ¶', 'Ø¹Ø¯Ø¯'].some((word) => query.includes(word))) {
    return fillTemplate(t.aiPatientCountReply, { count: statsData.totalPatients });
  }
  if (['appointment', 'today', 'rendez-vous', 'rdv', 'aujourd', 'Ù…ÙˆØ¹Ø¯', 'Ù…ÙˆØ§Ø¹ÙŠØ¯', 'Ø§Ù„ÙŠÙˆÙ…'].some((word) => query.includes(word))) {
    const appointments = todayAppointments
      .map((item) => fillTemplate(t.aiAppointmentItem, { time: item.time, name: item.patientName }))
      .join('; ');
    return fillTemplate(t.aiAppointmentsReply, {
      count: statsData.sessionsToday,
      appointments: appointments || t.aiNoAppointments,
    });
  }
  if (['alert', 'alerte', 'ØªÙ†Ø¨ÙŠÙ‡', 'ØªÙ†Ø¨ÙŠÙ‡Ø§Øª'].some((word) => query.includes(word))) {
    return fillTemplate(t.aiAlertsReply, { count: statsData.alertsCount });
  }
  if (['report', 'rapport', 'ØªÙ‚Ø±ÙŠØ±', 'ØªÙ‚Ø§Ø±ÙŠØ±'].some((word) => query.includes(word))) {
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
  const { t, language, dir } = usePreferences();

  const [chatState, setChatState] = useState(loadChatState);
  const [draft, setDraft] = useState('');

  const { conversations, activeId } = chatState;

  const activeConversation =
    conversations.find((conversation) => conversation.id === activeId) ||
    conversations[0];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatState));
    } catch {
      // Ignore storage errors.
    }
  }, [chatState]);

  function sendMessage(event) {
    event.preventDefault();

    const question = draft.trim();

    if (!question || !activeConversation) return;

    const answer = getLocalAnswer(question, t);
    const now = new Date().toISOString();

    setChatState((current) => ({
      ...current,
      conversations: current.conversations.map((conversation) =>
        conversation.id === activeConversation.id
          ? {
              ...conversation,
              title: conversation.title || question,
              updatedAt: now,
              messages: [
                ...conversation.messages,
                { from: 'doctor', text: question },
                { from: 'assistant', text: answer },
              ],
            }
          : conversation,
      ),
    }));

    setDraft('');
  }

  function startNewChat() {
    const conversation = createConversation();

    setChatState((current) => ({
      conversations: [conversation, ...current.conversations],
      activeId: conversation.id,
    }));

    setDraft('');
  }

  function selectConversation(id) {
    setChatState((current) => ({
      ...current,
      activeId: id,
    }));

    setDraft('');
  }

  function deleteConversation(event, id) {
    event.stopPropagation();

    setChatState((current) => {
      const remaining = current.conversations.filter(
        (conversation) => conversation.id !== id,
      );

      if (remaining.length === 0) {
        const newConversation = createConversation();

        return {
          conversations: [newConversation],
          activeId: newConversation.id,
        };
      }

      return {
        conversations: remaining,
        activeId:
          current.activeId === id ? remaining[0].id : current.activeId,
      };
    });

    setDraft('');
  }

  function formatDate(date) {
    try {
      const locale =
        language === 'ar'
          ? 'ar-DZ'
          : language === 'fr'
            ? 'fr-FR'
            : 'en-US';

      return new Date(date).toLocaleDateString(locale, {
        day: 'numeric',
        month: 'short',
      });
    } catch {
      return '';
    }
  }

  return (
    <section className="ai-assistant-page">
      <div className="ai-assistant-layout">

        <div className="ai-assistant-card" dir={dir}>
          <header className="ai-assistant-header">
            <div className="ai-assistant-heading">
              <span className="ai-assistant-heading-icon">
                <Sparkles size={17} />
              </span>
              <div>
                <h1>{t.aiAssistant}</h1>
                <p>KINEORA AI</p>
              </div>
            </div>

            <span className="ai-assistant-bot-icon">
              <Bot size={19} />
            </span>
          </header>

          <div className="ai-assistant-messages" aria-live="polite">
            {activeConversation?.messages.map((message, index) => (
              <article
                key={`${activeConversation.id}-${index}`}
                className={`ai-assistant-message ${message.from}`}
              >
                <p>
                  {message.textKey ? t[message.textKey] : message.text}
                </p>
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

            <button
              type="submit"
              aria-label={t.sendQuestion}
              disabled={!draft.trim()}
            >
              <Send size={16} />
            </button>
          </form>
        </div>

        <aside className="ai-assistant-history" dir={dir}>
          <div className="ai-history-header">
            <div className="ai-history-title">
              <MessageSquare size={17} />
              <h2>{t.aiChatHistory}</h2>
            </div>

            <button
              type="button"
              className="ai-new-chat-button"
              onClick={startNewChat}
            >
              <MessageSquarePlus size={16} />
              <span>{t.aiNewChat}</span>
            </button>
          </div>

          <div className="ai-history-list">
            {conversations.length === 0 ? (
              <p className="ai-history-empty">{t.aiNoHistory}</p>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`ai-history-item ${
                    conversation.id === activeId ? 'active' : ''
                  }`}
                  onClick={() => selectConversation(conversation.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      selectConversation(conversation.id);
                    }
                  }}
                >
                  <MessageSquare size={16} className="ai-history-item-icon" />

                  <div className="ai-history-item-content">
                    <span className="ai-history-item-name">
                      {conversation.title || t.aiGreeting}
                    </span>
                    <small>{formatDate(conversation.updatedAt)}</small>
                  </div>

                  <button
                    type="button"
                    className="ai-delete-chat-button"
                    aria-label={t.aiDeleteChat}
                    title={t.aiDeleteChat}
                    onClick={(event) =>
                      deleteConversation(event, conversation.id)
                    }
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>
        </aside>

      </div>
    </section>
  );
}
