import { useState } from 'react';
import { X, UserRound } from 'lucide-react';

const avatars = ['👦', '👧', '🧑', '👨', '👩', '🧒', '👴', '👵'];

export default function AddPatientModal({ onClose, onSave }) {
  const [name, setName] = useState('');
  const [guardian, setGuardian] = useState('');
  const [condition, setCondition] = useState('');
  const [avatar, setAvatar] = useState(avatars[0]);
  const [progress, setProgress] = useState(10);
  const [week, setWeek] = useState(1);
  const [totalWeeks, setTotalWeeks] = useState(6);
  const [addExercises, setAddExercises] = useState(true);

  function handleSubmit(event) {
    event.preventDefault();

    onSave({
      id: `PAT-${Date.now()}`,
      name: name.trim(),
      guardian: guardian.trim() || '—',
      condition,
      avatar,
      progressPercent: Number(progress),
      week: Number(week),
      totalWeeks: Number(totalWeeks),
      exercises: addExercises
        ? [
            { name: 'Knee flexion', sets: '3', reps: '12', duration: '1' },
            { name: 'Calf stretch', sets: '3', reps: '30s', duration: '1' },
          ]
        : [],
    });
  }

  return (
    <div className="add-patient-overlay" onMouseDown={onClose}>
      <form
        className="add-patient-modal"
        onSubmit={handleSubmit}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="add-patient-heading">
          <span className="add-patient-icon"><UserRound size={21} /></span>
          <div>
            <strong>Add patient</strong>
            <small>KINEORA</small>
          </div>
          <button type="button" className="close-edit" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </header>

        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Patient name *"
        />
        <input
          value={guardian}
          onChange={(event) => setGuardian(event.target.value)}
          placeholder="Parent (optional)"
        />
        <input
          required
          value={condition}
          onChange={(event) => setCondition(event.target.value)}
          placeholder="Diagnosis *"
        />

        <label className="avatar-label">Avatar</label>
        <div className="avatar-options">
          {avatars.map((item) => (
            <button
              type="button"
              key={item}
              className={avatar === item ? 'selected' : ''}
              onClick={() => setAvatar(item)}
              aria-label={`Choose avatar ${item}`}
            >
              {item}
            </button>
          ))}
        </div>

        <label className="progress-input-label">
          <span>Progress</span>
          <strong>{progress}%</strong>
        </label>
        <input
          className="progress-range"
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(event) => setProgress(event.target.value)}
        />

        <div className="week-inputs">
          <input
            type="number"
            min="1"
            value={week}
            onChange={(event) => setWeek(event.target.value)}
            aria-label="Current week"
          />
          <input
            type="number"
            min="1"
            value={totalWeeks}
            onChange={(event) => setTotalWeeks(event.target.value)}
            aria-label="Total weeks"
          />
        </div>

        <label className="auto-exercises-option">
          <input
            type="checkbox"
            checked={addExercises}
            onChange={(event) => setAddExercises(event.target.checked)}
          />
          Add basic exercises automatically
        </label>

        <button className="save-plan-button" type="submit">
          💾 Save patient
        </button>
      </form>
    </div>
  );
}