import { useState } from 'react';
import { Lightbulb, Send, X } from 'lucide-react';


export default function PatientTipsPage({ patient, onClose, onSend }) {
  const [tip, setTip] = useState('');
  const [notice, setNotice] = useState('');

  if (!patient) return null;

  const condition = patient.condition || patient.conditionKey || 'Patient';

  function handleSubmit(event) {
    event.preventDefault();

    if (!tip.trim()) return;

    if (onSend) {
      onSend({ patient, tip: tip.trim() });
      setNotice('Tip sent.');
    } else {
      setNotice('Tip ready. Connect a messaging service to deliver it.');
    }
  }

  return (
    <div className="tips-overlay" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        className="tips-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tips-title"
      >
        <header className="tips-header">
          <span className="tips-icon"><Lightbulb size={20} /></span>

          <div>
            <h2 id="tips-title">{patient.name} — Tips</h2>
            <small>{condition}</small>
          </div>

          <button
            className="tips-close"
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </header>

        <div className="tips-suggestion">
          <span className="tips-suggestion-icon"><Lightbulb size={16} /></span>
          <div>
            <p>Have {patient.name} exercise in the morning before fatigue.</p>
            <time>{new Date().toISOString().slice(0, 10)}</time>
          </div>
        </div>

        <form className="tips-form" onSubmit={handleSubmit}>
          <label className="tips-sr-only" htmlFor="patient-tip">
            Write a tip for the patient
          </label>
          <textarea
            id="patient-tip"
            value={tip}
            onChange={(event) => {
              setTip(event.target.value);
              setNotice('');
            }}
            placeholder="Write a tip for the patient..."
            rows={3}
          />

          {notice && <p className="tips-notice" role="status">{notice}</p>}

          <button className="tips-send" type="submit" disabled={!tip.trim()}>
            <Send size={14} />
            Send tip
          </button>
        </form>
      </section>
    </div>
  );
}