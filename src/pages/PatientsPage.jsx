import { Pencil, Lightbulb, Plus , Search  } from 'lucide-react';
import usePreferences from '../hooks/usePreferences.js';
import { useState } from 'react';
import PatientDetailsPage from './PatientDetailsPage.jsx';

const patients = [
  { id: 1, name: 'Yacine', guardian: 'Fatima', conditionKey: 'forearmFracture', week: 4, totalWeeks: 6, progressPercent: 66, avatar: '👦' },
  { id: 2, name: 'Amira', guardian: 'Karim', conditionKey: 'clavicleFracture', week: 3, totalWeeks: 8, progressPercent: 38, avatar: '👧' },
  { id: 3, name: 'Mohamed', guardian: 'Rachid', conditionKey: 'hipFracture', week: 2, totalWeeks: 12, progressPercent: 18, avatar: '👦' },
  { id: 4, name: 'Salim', guardian: 'Personal patient', conditionKey: 'wristFracture', week: 5, totalWeeks: 6, progressPercent: 84, avatar: '🧑' },
];

export default function PatientsPage() {
  const { t } = usePreferences();
  const [search, setSearch] = useState('');

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

  <button className="add-patient" type="button">
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
                <small>{t.patientLabel}: {patient.guardian}</small>
              </div>

              <span className="status">{t[patient.conditionKey]}</span>
            </div>

            <p>
              <span>{t.week} {patient.week} {t.of} {patient.totalWeeks}</span>
              <strong>{patient.progressPercent}%</strong>
            </p>

            <div className="progress">
              <span style={{ width: `${patient.progressPercent}%` }} />
            </div>

            <div className="patient-actions">
              <button className="details" type="button" onClick={() => setSelectedPatient(patient)}>
                {t.viewDetails}
              </button>
              <button className="icon-action" type="button" aria-label="Edit patient">
                <Pencil size={15} />
              </button>
              <button className="icon-action" type="button" aria-label="Patient advice">
                <Lightbulb size={15} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}