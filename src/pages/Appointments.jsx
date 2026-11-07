import { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays, Clock3, UserRound, Plus, Check,
  Pencil, Trash2, X, CalendarClock
} from 'lucide-react';
import usePreferences from '../hooks/usePreferences.js';

const STORAGE_KEY = 'kineora_appointments';

function getDateString(offset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function createInitialAppointments() {
  return [
    {
      id: 'APT-101',
      patientName: 'Yacine',
      date: getDateString(),
      time: '09:30',
      typeKey: 'checkup',
      statusKey: 'confirmed',
    },
    {
      id: 'APT-102',
      patientName: 'Amira',
      date: getDateString(),
      time: '11:00',
      typeKey: 'xray',
      statusKey: 'pending',
    },
    {
      id: 'APT-103',
      patientName: 'Mohamed',
      date: getDateString(1),
      time: '13:45',
      typeKey: 'teleconsultation',
      statusKey: 'confirmed',
    },
    {
      id: 'APT-104',
      patientName: 'Sara',
      date: getDateString(2),
      time: '10:30',
      typeKey: 'checkup',
      statusKey: 'pending',
    },
  ];
}

function loadAppointments() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (error) {
    console.error('Could not load appointments:', error);
  }
  return createInitialAppointments();
}

function formatDate(dateString, language) {
  const date = new Date(`${dateString}T12:00:00`);
  const locale = language === 'ar' ? 'ar-DZ' : language === 'fr' ? 'fr-FR' : 'en-GB';
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

const emptyForm = {
  patientName: '',
  date: getDateString(),
  time: '09:00',
  typeKey: 'checkup',
};

export default function Appointments() {
  const { t, language } = usePreferences();
  const [appointments, setAppointments] = useState(loadAppointments);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    } catch (error) {
      console.error('Could not save appointments:', error);
    }
  }, [appointments]);

  const today = getDateString();

  const todayAppointments = useMemo(
    () => appointments
      .filter((item) => item.date === today)
      .sort((a, b) => a.time.localeCompare(b.time)),
    [appointments, today]
  );

  const upcomingAppointments = useMemo(
    () => appointments
      .filter((item) => item.date > today)
      .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)),
    [appointments, today]
  );

  function openAddModal() {
    setEditingId(null);
    setFormData({ ...emptyForm, date: getDateString() });
    setModalOpen(true);
  }

  function openEditModal(appointment) {
    setEditingId(appointment.id);
    setFormData({
      patientName: appointment.patientName,
      date: appointment.date,
      time: appointment.time,
      typeKey: appointment.typeKey,
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanName = formData.patientName.trim();
    if (!cleanName || !formData.date || !formData.time) return;

    if (editingId) {
      setAppointments((current) =>
        current.map((item) =>
          item.id === editingId
            ? { ...item, ...formData, patientName: cleanName }
            : item
        )
      );
    } else {
      setAppointments((current) => [
        ...current,
        {
          id: `APT-${Date.now()}`,
          ...formData,
          patientName: cleanName,
          statusKey: 'pending',
        },
      ]);
    }

    closeModal();
  }

  function confirmAppointment(id) {
    setAppointments((current) =>
      current.map((item) =>
        item.id === id ? { ...item, statusKey: 'confirmed' } : item
      )
    );
  }

  function deleteAppointment(id) {
    const confirmed = window.confirm(
      t.deleteAppointmentConfirm || 'Are you sure you want to delete this appointment?'
    );
    if (!confirmed) return;
    setAppointments((current) => current.filter((item) => item.id !== id));
  }

  function renderAppointment(item) {
    return (
      <article className="appointment-card" key={item.id}>
        <div className="appointment-date-tile">
          <CalendarDays size={19} />
          <strong>{formatDate(item.date, language)}</strong>
        </div>

        <div className="appointment-card-info">
          <h3><UserRound size={16} /> <bdi>{item.patientName}</bdi></h3>
          <p>
            <Clock3 size={14} />
            <bdi>{item.time}</bdi>
            <span className="appointment-dot">•</span>
            {t[item.typeKey] || item.typeKey}
          </p>
        </div>

        <span className={`appointment-card-status ${item.statusKey}`}>
          {t[item.statusKey] || item.statusKey}
        </span>

        <div className="appointment-card-actions">
          {item.statusKey === 'pending' && (
            <button
              type="button"
              className="appointment-confirm-btn"
              onClick={() => confirmAppointment(item.id)}
            >
              <Check size={15} />
              {t.confirm || 'Confirm'}
            </button>
          )}
          <button
            type="button"
            className="appointment-reschedule-btn"
            onClick={() => openEditModal(item)}
          >
            <Pencil size={14} />
            {t.reschedule || 'Reschedule'}
          </button>
          <button
            type="button"
            className="appointment-delete-btn"
            onClick={() => deleteAppointment(item.id)}
            aria-label={t.deleteAppointment || 'Delete appointment'}
            title={t.deleteAppointment || 'Delete appointment'}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </article>
    );
  }

  return (
    <main className={`appointments-page ${language === 'ar' ? 'rtl' : ''}`}>
      <div className="appointments-heading">
        <div>
          <h1>{t.appointments || 'Appointments'}</h1>
          <p>{t.appointmentsSubtitle || 'Manage and organize your patient appointments.'}</p>
        </div>
        <button type="button" className="add-appointment-btn" onClick={openAddModal}>
          <Plus size={18} />
          {t.addAppointment || 'Add appointment'}
        </button>
      </div>

      <section className="appointments-section">
        <div className="appointments-section-heading">
          <div>
            <span className="appointments-heading-mark" />
            <h2>{t.today || 'Today'}</h2>
          </div>
          <span className="appointments-count">{todayAppointments.length}</span>
        </div>

        {todayAppointments.length > 0 ? (
          <div className="appointments-list">
            {todayAppointments.map(renderAppointment)}
          </div>
        ) : (
          <p className="appointments-empty">{t.noAppointmentsToday || 'No appointments for today.'}</p>
        )}
      </section>

      <section className="appointments-section">
        <div className="appointments-section-heading">
          <div>
            <span className="appointments-heading-mark" />
            <h2>{t.upcoming || 'Upcoming'}</h2>
          </div>
          <span className="appointments-count">{upcomingAppointments.length}</span>
        </div>

        {upcomingAppointments.length > 0 ? (
          <div className="appointments-list">
            {upcomingAppointments.map(renderAppointment)}
          </div>
        ) : (
          <p className="appointments-empty">{t.noUpcomingAppointments || 'No upcoming appointments.'}</p>
        )}
      </section>

      {modalOpen && (
        <div className="appointment-modal-overlay" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeModal();
        }}>
          <section
            className="appointment-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="appointment-modal-title"
          >
            <div className="appointment-modal-heading">
              <div>
                <span className="appointment-modal-icon"><CalendarClock size={21} /></span>
                <h2 id="appointment-modal-title">
                  {editingId
                    ? (t.rescheduleAppointment || 'Reschedule appointment')
                    : (t.addAppointment || 'Add appointment')}
                </h2>
              </div>
              <button type="button" className="appointment-modal-close" onClick={closeModal} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                {t.patientName || 'Patient name'}
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(event) => setFormData({ ...formData, patientName: event.target.value })}
                  placeholder={t.enterPatientName || 'Enter patient name'}
                  required
                />
              </label>

              <div className="appointment-form-row">
                <label>
                  {t.date || 'Date'}
                  <input
                    type="date"
                    value={formData.date}
                    min={getDateString()}
                    onChange={(event) => setFormData({ ...formData, date: event.target.value })}
                    required
                  />
                </label>
                <label>
                  {t.time || 'Time'}
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(event) => setFormData({ ...formData, time: event.target.value })}
                    required
                  />
                </label>
              </div>

              <label>
                {t.appointmentType || 'Appointment type'}
                <select
                  value={formData.typeKey}
                  onChange={(event) => setFormData({ ...formData, typeKey: event.target.value })}
                >
                  <option value="checkup">{t.checkup || 'Check-up'}</option>
                  <option value="xray">{t.xray || 'X-ray'}</option>
                  <option value="teleconsultation">{t.teleconsultation || 'Teleconsultation'}</option>
                </select>
              </label>

              <div className="appointment-modal-actions">
                <button type="button" className="appointment-cancel-btn" onClick={closeModal}>
                  {t.cancel || 'Cancel'}
                </button>
                <button type="submit" className="appointment-save-btn">
                  {editingId ? (t.saveChanges || 'Save changes') : (t.addAppointment || 'Add appointment')}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
