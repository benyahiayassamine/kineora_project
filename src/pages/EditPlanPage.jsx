import { useState } from 'react';
import { X } from 'lucide-react';
import usePreferences from '../hooks/usePreferences.js';

const defaultExercises = [
  { name: '🏋️ Knee flexion', sets: '3', reps: '12', duration: '1' },
  { name: '🦵 Calf stretch', sets: '3', reps: '30s', duration: '1' },
  { name: '🛏️ Glute bridge', sets: '3', reps: '15', duration: '2' },
  { name: '〽️ Leg raise', sets: '3', reps: '12', duration: '1' },
  { name: '🚶 Light walking', sets: '1', reps: '10', duration: '10' },
];

function prepareExercises(items) {
  if (!items?.length) return defaultExercises;

  // يحوّل التمارين القديمة، إذا كانت محفوظة كنص، للشكل الجديد
  return items.map((item) =>
    typeof item === 'string'
      ? { name: item, sets: '', reps: '', duration: '' }
      : item
  );
}

export default function EditPlanPage({
  patient,
  onBack,
  initialExercises = [],
  onSave,
}) {
  const { t } = usePreferences();

  const [tab, setTab] = useState('exercises');
  const [exercises, setExercises] = useState(() =>
    prepareExercises(initialExercises)
  );
  const [newExercise, setNewExercise] = useState({
    name: '',
    sets: '',
    reps: '',
    duration: '',
  });

  function updateNewExercise(field, value) {
    setNewExercise((current) => ({ ...current, [field]: value }));
  }

  function addExercise() {
    if (!newExercise.name.trim()) return;

    setExercises((current) => [
      ...current,
      { ...newExercise, name: newExercise.name.trim() },
    ]);

    setNewExercise({ name: '', sets: '', reps: '', duration: '' });
  }

  function removeExercise(indexToRemove) {
    setExercises((current) =>
      current.filter((_, index) => index !== indexToRemove)
    );
  }

  function savePlan() {
    onSave(exercises);
  }

  return (
    <section className="edit-plan-screen">
      <article className="edit-plan-card">
        <header className="edit-plan-heading">
          <span className="patient-avatar">{patient.avatar}</span>

          <div>
            <strong>
              {patient.name} — {t.editPlan || 'Edit plan'}
            </strong>
            <small>
              {patient.conditionKey
                ? t[patient.conditionKey]
                : patient.condition}
            </small>
          </div>

          <button
            type="button"
            className="close-edit"
            onClick={onBack}
            aria-label={t.close || 'Close'}
          >
            <X size={18} />
          </button>
        </header>

        <nav className="edit-plan-tabs">
          <button
            type="button"
            className={tab === 'exercises' ? 'active' : ''}
            onClick={() => setTab('exercises')}
          >
            🏋️ {t.exercises || 'Exercises'}
          </button>
          <button
            type="button"
            className={tab === 'medication' ? 'active' : ''}
            onClick={() => setTab('medication')}
          >
            💊 {t.medicationLabel || t.medication || 'Medication'}
          </button>
          <button
            type="button"
            className={tab === 'versions' ? 'active' : ''}
            onClick={() => setTab('versions')}
          >
            📁 {t.previousVersions || 'Previous versions'}
          </button>
        </nav>

        {tab === 'exercises' && (
          <>
            <div className="edit-exercise-list">
              {exercises.map((exercise, index) => (
                <div className="edit-exercise-row" key={`${exercise.name}-${index}`}>
                  <span>
                    {exercise.name}{' '}
                    {exercise.sets && `${exercise.sets}×`}
                    {exercise.reps}
                    {exercise.duration && ` • ${exercise.duration} min`}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeExercise(index)}
                    aria-label={t.removeExercise || 'Remove exercise'}
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>

            <div className="new-exercise-fields">
              <input
                value={newExercise.name}
                onChange={(event) => updateNewExercise('name', event.target.value)}
                placeholder={t.exerciseName || 'Exercise name'}
              />
              <input
                value={newExercise.sets}
                onChange={(event) => updateNewExercise('sets', event.target.value)}
                placeholder={t.sets || 'Sets'}
              />
              <input
                value={newExercise.reps}
                onChange={(event) => updateNewExercise('reps', event.target.value)}
                placeholder={t.reps || 'Reps'}
              />
              <input
                value={newExercise.duration}
                onChange={(event) =>
                  updateNewExercise('duration', event.target.value)
                }
                placeholder={t.durationMin || 'Duration (min)'}
              />
            </div>

            <button
              className="add-exercise-button"
              type="button"
              onClick={addExercise}
            >
              + {t.addExercise || 'Add exercise'}
            </button>
          </>
        )}

        {tab === 'medication' && (
          <div className="edit-plan-placeholder">
            <label>{t.medicationLabel || t.medication || 'Medication'}</label>
            <input
              defaultValue={patient.medication || ''}
              placeholder={t.medicationName || 'Medication name'}
            />
            <label>{t.dosage || 'Dosage'}</label>
            <input
              placeholder={t.dosageExample || 'Example: 500 mg, twice a day'}
            />
          </div>
        )}

        {tab === 'versions' && (
          <p className="edit-plan-placeholder">
            {t.noPreviousVersions || 'No previous versions yet.'}
          </p>
        )}

        <button
          className="save-plan-button"
          type="button"
          onClick={savePlan}
        >
          💾 {t.savePlan || 'Save plan'}
        </button>
      </article>
    </section>
  );
}