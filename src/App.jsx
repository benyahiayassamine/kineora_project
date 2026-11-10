import { useState } from 'react';
import {
  Activity,
  Bell,
  CalendarDays,
  Eye,
  EyeOff,
  Heart,
  HeartPulse,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UsersRound,
  UserRound,
  
} from 'lucide-react';
import Topbar from './components/Topbar.jsx';
import Appointments from './pages/Appointments.jsx';
import LanguageThemePicker from './components/LanguageThemePicker.jsx';
import usePreferences from './hooks/usePreferences.js';
import { currentDoctor, followUpPatients, statsData, todayAppointments } from './data/mockData.js';
import kineoraLogo from './assets/kineora-logo.png';
import PatientsPage from './pages/PatientsPage.jsx';
import PatientDetailsPage from './pages/PatientDetailsPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

function Dashboard({ currentPage, onNavigate, onLogout }) {  const { t, language } = usePreferences();
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
<main id="home" className={`dashboard ${language === 'ar' ? 'rtl' : ''}`}>
  <Topbar
    onLogout={onLogout}
    currentPage={currentPage}
    onNavigate={onNavigate}
  />

      {selectedPatient ? (
  <PatientDetailsPage
    patient={selectedPatient}
    onBack={() => setSelectedPatient(null)}
  />
) : currentPage === 'settings' ? (
        <SettingsPage />
      ) : currentPage === 'reports' ? (
        <ReportsPage />
      ) : currentPage === 'appointments' ? (
        <Appointments />
      ) : currentPage === 'patients' ? (
        <PatientsPage />
      ) : (
        <>
          <section className="welcome-card">
            <div>
              <h2>
                {t.greetingPrefix},{' '}
                <bdi className="entity-name">{currentDoctor.name}</bdi>{' '}
                {t.greetingSuffix}
              </h2>
              <p>{t.summary}</p>
            </div>
            <button type="button" onClick={() => onNavigate('appointments')}
              >
             {t.start}
           </button>
          </section>

          <section id="reports" className="stats">
            <article className="stat-card">
              <span className="stat-icon"><UsersRound /></span>
              <div>
                <strong>{statsData.totalPatients}</strong>
                <small>{t.totalPatients}</small>
              </div>
            </article>

            <article className="stat-card">
              <span className="stat-icon"><CalendarDays /></span>
              <div>
                <strong>{statsData.sessionsToday}</strong>
                <small>{t.sessions}</small>
              </div>
            </article>

            <article className="stat-card">
              <span className="stat-icon"><HeartPulse /></span>
              <div>
                <strong>{statsData.avgAdherence}</strong>
                <small>{t.adherence}</small>
              </div>
            </article>

            <article className="stat-card">
              <span className="stat-icon"><Bell /></span>
              <div>
                <strong>{statsData.alertsCount}</strong>
                <small>{t.alerts}</small>
              </div>
            </article>
          </section>

          <section id="appointments" className="today">
            <div className="section-title">
              <h3>{t.today}</h3>
              <button type="button" onClick={() => onNavigate('appointments')}
                >
               {t.seeAll}
             </button>
            </div>

            {todayAppointments.map((apt) => (
              <article key={apt.id} className="appointment">
                <div className="date-box">
                  <strong>{apt.date.day}</strong>
                  <small>{apt.date.month}</small>
                </div>

                <div className="appointment-info">
                  <strong className="appointment-person">
                    <UserRound size={14} />
                    <bdi>{apt.patientName}</bdi>
                  </strong>
                  <small>
                    {apt.time} • {t[apt.typeKey]}
                  </small>
                </div>

                <span className={`appointment-status ${apt.statusKey}`}>
                  {t[apt.statusKey]}
                </span>
              </article>
            ))}
          </section>

          <section id="patients" className="follow-up">
            <div className="section-title">
              <h3>{t.followUp}</h3>
              <button type="button" onClick={() => onNavigate('patients')}
                  >
                 {t.seeAll}
              </button>
            </div>

            <div className="patient-list">
              {followUpPatients.slice(0, 2).map((patient) => (
                <article key={patient.id} className="patient-card">
                  <div className="patient-heading">
                    <span className="patient-avatar">{patient.avatar}</span>

                    <div>
                      <strong>{patient.name}</strong>
                      <small>
                        {t.patientLabel}: {patient.guardian}
                      </small>
                    </div>

                    <span className="status">{t[patient.conditionKey]}</span>
                  </div>

                  <p>
                    <span>
                      {t.week} {patient.currentWeek} {t.of} {patient.totalWeeks}
                    </span>
                    <strong>{patient.progressPercent}%</strong>
                  </p>

                  <div className="progress">
                    <span style={{ width: `${patient.progressPercent}%` }} />
                  </div>

                  <button
  type="button"
  className="details"
  onClick={() => setSelectedPatient(patient)}
>
  {t.viewDetails}
</button>
                </article>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
function Login({ onLogin }) {
  const { t, language } = usePreferences();
  const [role, setRole] = useState('doctor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onLogin();
  }

  return (
    <main className={`page ${language === 'ar' ? 'rtl' : ''}`}>
      <LanguageThemePicker className="language-picker" />

      <section className="login-column">
          <header className="brand">
           <img
             className="login-logo"
             src={kineoraLogo}
             alt=""
            />
            <div className="brand-name">KINEORA</div>
            <div className="tagline">{t.tagline}</div>
         </header>

        <div className="role-switch">
          <button
            type="button"
            className={role === 'doctor' ? 'active' : ''}
            onClick={() => setRole('doctor')}
          >
            🧑 {t.doctor}
          </button>
          <button
            type="button"
            className={role === 'parent' ? 'active' : ''}
            onClick={() => setRole('parent')}
          >
            🧑 {t.parent}
          </button>
        </div>

        <form className="card sign-in-card" onSubmit={handleSubmit}>
          <label className="input-wrap">
            <Mail size={15} />
            <input
              type="email"
              placeholder={t.email}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className="input-wrap">
            <LockKeyhole size={15} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={t.password}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button
              type="button"
              className="eye-button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Show or hide password"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </label>

          <button
            className="forgot"
            type="button"
            onClick={() => setNotice(t.resetNotice)}
          >
            {t.forgot}
          </button>

          <button className="submit-button" type="submit">{t.signIn}</button>

          <p className="signup-line">
            {t.noAccount}{' '}
            <button type="button" onClick={() => setNotice(t.signupNotice)}>
              {t.signUp}
            </button>
          </p>

          {notice && <p className="notice">{notice}</p>}
        </form>

        <footer className="values">
          <span><ShieldCheck />{t.trust}</span>
          <span><Activity />{t.wellbeing}</span>
          <span><UsersRound />{t.progress}</span>
          <span><Heart />{t.humanity}</span>
          <span><Sparkles />{t.innovation}</span>
        </footer>
      </section>
    </main>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

return (
  <Dashboard
    currentPage={currentPage}
    onNavigate={setCurrentPage}
    onLogout={() => setLoggedIn(false)}
  />
);
  
}
