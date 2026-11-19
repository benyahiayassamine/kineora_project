import { useState } from 'react';
import { Lightbulb, Send, X } from 'lucide-react';
import usePreferences from '../hooks/usePreferences.js';

export default function PatientTipsPage({ patient, onClose, onSend }) {
  const { t, dir } = usePreferences();

  const conditionKey = patient?.conditionKey;

  const suggestionKeys = {
    forearmFracture: 'tipForearmFracture',
    clavicleFracture: 'tipClavicleFracture',
    hipFracture: 'tipHipFracture',
    wristFracture: 'tipWristFracture',
  };

  const suggestionKey = suggestionKeys[conditionKey] || 'tipGeneral';
  const suggestedTip = t[suggestionKey] || t.tipGeneral || '';

  const [tip, setTip] = useState(suggestedTip);
  const [notice, setNotice] = useState('');

  if (!patient) return null;

  const condition = conditionKey
    ? (t[conditionKey] || conditionKey)
    : (patient.condition || 'Patient');

  function handleSubmit(event) {
    event.preventDefault();

    const cleanTip = tip.trim();
    if (!cleanTip) return;

    if (onSend) {
      onSend({
        patient,
        tip: cleanTip,
        date: new Date().toISOString(),
      });

      setNotice(t.patientTipsSaved);
    }
  }

  return (
    <div
      className="tips-overlay"
      dir={dir}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="tips-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tips-title"
      >
        <header className="tips-header">
          <span className="tips-icon">
            <Lightbulb size={20} />
          </span>

          <div>
            <h2 id="tips-title">
              {patient.name} — {t.patientTipsTitle}
            </h2>
            <small>{condition}</small>
          </div>

          <button
            className="tips-close"
            type="button"
            onClick={onClose}
            aria-label={t.patientTipsClose}
            title={t.patientTipsClose}
          >
            <X size={16} />
          </button>
        </header>

        <div className="tips-suggestion">
          <span className="tips-suggestion-icon">
            <Lightbulb size={16} />
          </span>

          <div>
            <strong>{t.patientTipsSuggestionTitle}</strong>
            <p>{suggestedTip}</p>
          </div>
        </div>

        <form className="tips-form" onSubmit={handleSubmit}>
          <label className="tips-sr-only" htmlFor="patient-tip">
            {t.patientTipsPlaceholder}
          </label>

          <textarea
            id="patient-tip"
            value={tip}
            onChange={(event) => {
              setTip(event.target.value);
              setNotice('');
            }}
            placeholder={t.patientTipsPlaceholder}
            rows={4}
          />

          {notice && (
            <p className="tips-notice" role="status">
              {notice}
            </p>
          )}

          <button
            className="tips-send"
            type="submit"
            disabled={!tip.trim()}
          >
            <Send size={14} />
            {t.patientTipsSave}
          </button>
        </form>
      </section>
    </div>
  );
}
