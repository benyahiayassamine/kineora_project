import { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { followUpPatients } from '../data/mockData.js';
import usePreferences from '../hooks/usePreferences.js';

const initialMessages = {
  'PAT-201': [
    { from: 'patient', textKey: 'chatSampleYacine1', time: '09:15' },
    { from: 'doctor', textKey: 'chatSampleYacine2', time: '09:22' },
    { from: 'patient', textKey: 'chatSampleYacine3', time: '09:30' },
  ],
  'PAT-202': [
    { from: 'patient', textKey: 'chatSampleAmira1', time: '10:05' },
    { from: 'doctor', textKey: 'chatSampleAmira2', time: '10:12' },
  ],
  'PAT-203': [
    { from: 'patient', textKey: 'chatSampleMohamed1', time: '11:20' },
    { from: 'doctor', textKey: 'chatSampleMohamed2', time: '11:28' },
  ],
  'PAT-204': [
    { from: 'patient', textKey: 'chatSampleSalim1', time: '12:10' },
    { from: 'doctor', textKey: 'chatSampleSalim2', time: '12:16' },
  ],
};

export default function PatientsChatPage() {
  const { t } = usePreferences();
  const [selectedPatientId, setSelectedPatientId] = useState(followUpPatients[0]?.id);
  const [messages, setMessages] = useState(initialMessages);
  const [recentPatientIds, setRecentPatientIds] = useState([]);
  const [draft, setDraft] = useState('');
  const selectedPatient = followUpPatients.find((patient) => patient.id === selectedPatientId);
  const orderedPatients = [...followUpPatients].sort((first, second) => {
    const firstIndex = recentPatientIds.indexOf(first.id);
    const secondIndex = recentPatientIds.indexOf(second.id);
    return (firstIndex === -1 ? Infinity : firstIndex) - (secondIndex === -1 ? Infinity : secondIndex);
  });

  function sendMessage(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !selectedPatient) return;

    setMessages((current) => ({
      ...current,
      [selectedPatient.id]: [
        ...(current[selectedPatient.id] || []),
        {
          from: 'doctor',
          text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    }));
    setRecentPatientIds((current) => [
      selectedPatient.id,
      ...current.filter((patientId) => patientId !== selectedPatient.id),
    ]);
    setDraft('');
  }

  return (
    <section className="patients-chat-page">
      <h1 className="patients-chat-title">
        <MessageCircle size={15} /> {t.patientsChat}
      </h1>

      <div className="chat-layout">
        <aside className="conversation-panel">
          <h2>{t.conversations}</h2>
          <div className="conversation-list">
            {orderedPatients.map((patient) => {
              const patientMessages = messages[patient.id] || [];
              const lastMessage = patientMessages[patientMessages.length - 1];
              return (
                <button
                  key={patient.id}
                  type="button"
                  className={`conversation-item ${patient.id === selectedPatientId ? 'selected' : ''}`}
                  onClick={() => setSelectedPatientId(patient.id)}
                >
                  <span className="conversation-avatar">{patient.avatar}</span>
                  <span className="conversation-copy">
                    <strong>{patient.name}</strong>
                    <small>{lastMessage ? (lastMessage.textKey ? t[lastMessage.textKey] : lastMessage.text) : t.startConversation}</small>
                  </span>
                  {patient.id === selectedPatientId && <span className="conversation-unread" />}
                </button>
              );
            })}
          </div>
        </aside>

        {selectedPatient && (
          <section className="chat-panel" aria-label={t.conversationWith.replace('{name}', selectedPatient.name)}>
            <header className="chat-header">
              <span className="conversation-avatar">{selectedPatient.avatar}</span>
              <div>
                <strong>{selectedPatient.name}</strong>
                <small>{selectedPatient.conditionKey ? t[selectedPatient.conditionKey] : ''}</small>
              </div>
              <span className="chat-condition">
                {selectedPatient.conditionKey ? t[selectedPatient.conditionKey] : ''}
              </span>
            </header>

            <div className="chat-messages" aria-live="polite">
              {(messages[selectedPatient.id] || []).map((message, index) => (
                <article key={`${selectedPatient.id}-${index}`} className={`chat-message ${message.from}`}>
                  <p>{message.textKey ? t[message.textKey] : message.text}</p>
                  <time>{message.time}</time>
                </article>
              ))}
            </div>

            <form className="chat-compose" onSubmit={sendMessage}>
              <textarea
                aria-label={t.messagePatient}
                placeholder={t.messagePatient}
                rows={1}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
              />
              <button type="submit" aria-label={t.sendMessage} disabled={!draft.trim()}>
                <Send size={14} />
              </button>
            </form>
          </section>
        )}
      </div>
    </section>
  );
}
