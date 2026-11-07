import usePreferences from '../hooks/usePreferences.js';

export default function PatientDetailsPage({ patient, onBack }) {
  const { t } = usePreferences();
  const progress = patient.progressPercent ?? patient.progress;
  const week = patient.currentWeek ?? patient.week;
  const totalWeeks = patient.totalWeeks ?? patient.total;
  const adherence = patient.adherencePercent ?? progress;

  const exercises = patient.exercises ?? [
    '🏋️ Knee flexion',
    '🦵 Calf stretch',
    '🛏️ Glute bridge',
    '〽️ Leg raise',
  ];

  return (
    <section className="patient-details-page">
      <button className="back-button" type="button" onClick={onBack}>
        ← {t.patients}
      </button>

      <article className="patient-details-card">
        <div className="patient-modal-heading">
          <span className="patient-avatar">{patient.avatar}</span>
          <div>
            <strong>{patient.name}</strong>
            <small>{t.patientLabel}: {patient.guardian}</small>
          </div>
        </div>

        <span className="status">
          {patient.conditionKey
            ? t[patient.conditionKey] || patient.conditionKey
            : patient.condition}
        </span>

        <p className="modal-progress-label">
          <span>{t.week} {week} {t.of} {totalWeeks}</span>
          <strong>{progress}%</strong>
        </p>
        <div className="progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <p className="modal-progress-label">
          <span>{t.adherence}</span>
          <strong>{adherence}%</strong>
        </p>
        <div className="progress">
          <span style={{ width: `${adherence}%` }} />
        </div>

        <section className="detail-exercises">
          <h4>
            {t.exercises || 'Exercises'} ({patient.exerciseCount ?? 5})
            {' • '}
            {t.medicationLabel} ({patient.medicationCount ?? 2})
          </h4>

          <div className="exercise-chips">
            {exercises.map((exercise, index) => {
              const label =
                 typeof exercise === 'string'
                   ? exercise
                   : `${exercise.name}${exercise.sets ? ` ${exercise.sets}×` : ''}${
                       exercise.reps || ''
                     }${exercise.duration ? ` • ${exercise.duration} min` : ''}`;

            return <span key={`${label}-${index}`}>{label}</span>;
           })}
          </div>
        </section>
            <button
              className="export-pdf-button"
              type="button"
              onClick={() => window.print()}
            >
            📄 {t.exportPdf || 'Export PDF'}
            </button>
      </article>
    </section>
  );
}