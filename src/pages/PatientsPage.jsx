import { Pencil, Lightbulb, Plus , Search  } from 'lucide-react';
import usePreferences from '../hooks/usePreferences.js';
import { useEffect, useState } from 'react';
import PatientDetailsPage from './PatientDetailsPage.jsx';
import EditPlanPage from './EditPlanPage.jsx';
import AddPatientModal from './AddPatientModal.jsx';



export default function PatientsPage() {
  const [patientPlans, setPatientPlans] = useState({});
  const { t } = usePreferences();
  const [search, setSearch] = useState('');
  const [editingPatient, setEditingPatient] = useState(null);
 const [patients, setPatients] = useState(() => {
  try {
    const savedPatients = localStorage.getItem('kineora-patients');

    return savedPatients
      ? JSON.parse(savedPatients)
      : [
          { id: 1, name: 'Yacine', guardian: 'Fatima', conditionKey: 'forearmFracture', week: 4, totalWeeks: 6, progressPercent: 66, avatar: '👦' },
          { id: 2, name: 'Amira', guardian: 'Karim', conditionKey: 'clavicleFracture', week: 3, totalWeeks: 8, progressPercent: 38, avatar: '👧' },
          { id: 3, name: 'Mohamed', guardian: 'Rachid', conditionKey: 'hipFracture', week: 2, totalWeeks: 12, progressPercent: 18, avatar: '👦' },
          { id: 4, name: 'Salim', guardian: 'Personal patient', conditionKey: 'wristFracture', week: 5, totalWeeks: 6, progressPercent: 84, avatar: '🧑' },
        ];
  } catch {
    return [];
  }
});
useEffect(() => {
  localStorage.setItem('kineora-patients', JSON.stringify(patients));
}, [patients]);

const [showAddPatient, setShowAddPatient] = useState(false);

  const filteredPatients = patients.filter((patient) =>
  `${patient.name} ${patient.guardian}`
    .toLowerCase()
    .includes(search.toLowerCase())
  );
   const [selectedPatient, setSelectedPatient] = useState(null);
   if (selectedPatient) {
  return (
    <PatientDetailsPage
      patient={selectedPatient}
      onBack={() => setSelectedPatient(null)}
    />
  );
}


if (editingPatient) {
  return (
    <EditPlanPage
      patient={editingPatient}
      initialExercises={
        patientPlans[editingPatient.id] ||
        editingPatient.exercises ||
        []
      }
      onBack={() => setEditingPatient(null)}
      onSave={(exercises) => {
        setPatientPlans((plans) => ({
          ...plans,
          [editingPatient.id]: exercises,
        }));
        setEditingPatient(null);
      }}
    />
  );
}

  return (
    <section className="patients-page">
      <div className="section-title">
        <h3>{t.followUp}</h3>
        <div className="patient-tools">
  <label className="patient-search">
    <Search size={16} />
    <input
      type="search"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      placeholder={t.searchPatient || 'Search patient'}
    />
  </label>

  <button
  className="add-patient"
  type="button"
  onClick={() => setShowAddPatient(true)}
>
  <Plus size={14} />
  {t.addPatient || 'Add patient'}
</button>
</div>
      </div>

      <div className="patient-list">
{filteredPatients.map((patient) => (
  <article className="patient-card" key={patient.id}>
    <div className="patient-heading">
      <span className="patient-avatar">{patient.avatar}</span>

      <div>
        <strong>{patient.name}</strong>
        <small>
          {t.patientLabel}: {patient.guardian}
        </small>
      </div>

      <span className="status">
        {patient.conditionKey
          ? t[patient.conditionKey]
          : patient.condition}
      </span>
    </div>

    <p>
      <span>
        {t.week} {patient.week} {t.of} {patient.totalWeeks}
      </span>
      <strong>{patient.progressPercent}%</strong>
    </p>

    <div className="progress">
      <span style={{ width: `${patient.progressPercent}%` }} />
    </div>

    <div className="patient-actions">
      <button
        className="details"
        type="button"
        onClick={() => setSelectedPatient(patient)}
      >
        {t.viewDetails}
      </button>

      <button
        className="icon-action"
        type="button"
        aria-label="Edit patient"
        onClick={() => setEditingPatient(patient)}
      >
        <Pencil size={15} />
      </button>

      <button
        className="icon-action"
        type="button"
        aria-label="Patient advice"
      >
        <Lightbulb size={15} />
      </button>
    </div>
  </article>
))}
      </div>

      {showAddPatient && (
          <AddPatientModal
            onClose={() => setShowAddPatient(false)}
            onSave={(newPatient) => {
              setPatients((current) => [...current, newPatient]);
              setShowAddPatient(false);
            }}
          />
      )}
    </section>
  );
}