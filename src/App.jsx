import { useState } from 'react';
import {
  Activity, Eye, EyeOff, Heart, LockKeyhole, Mail,
  ShieldCheck, Sparkles, UsersRound,
} from 'lucide-react';
import Topbar from './components/Topbar.jsx';
import Appointments from './pages/Appointments.jsx';
import LanguageThemePicker from './components/LanguageThemePicker.jsx';
import usePreferences from './hooks/usePreferences.js';
import { currentDoctor, followUpPatients, statsData, todayAppointments } from './data/mockData.js';

function Dashboard({ currentPage, onNavigate }) {
  const { t, language } = usePreferences();

  return (
    <main className={`dashboard ${language === 'ar' ? 'rtl' : ''}`}>
      <Topbar currentPage={currentPage} onNavigate={onNavigate} />

      <section className="welcome-card">
        <div>
          <h2>
            {t.greetingPrefix}, <bdi className="entity-name">{currentDoctor.name}</bdi> {t.greetingSuffix}
          </h2>
          <p>{t.summary}</p>
        </div>
        <button type="button">{t.start}</button>
      </section>

      <section className="stats">
        <article><strong>{statsData.totalPatients}</strong><span>{t.totalPatients}</span></article>
        <article><strong>{statsData.sessionsToday}</strong><span>{t.sessions}</span></article>
        <article><strong>{statsData.avgAdherence}</strong><span>{t.adherence}</span></article>
        <article><strong>{statsData.alertsCount}</strong><span>{t.alerts}</span></article>
      </section>

      <section className="today">
        <div className="section-title">
          <h3>{t.today}</h3>
          <button type="button">{t.seeAll}</button>
        </div>

        {todayAppointments.map((apt) => (
          <article key={apt.id} className="appointment">
            <div className="date-box">
              <strong>{apt.date.day}</strong>
              <small>{apt.date.month}</small>
            </div>
            <div className="appointment-info">
              <strong>
                <bdi className="entity-name">{apt.patientName}</bdi>
              </strong>
              <small>
                <bdi>{apt.time}</bdi> • {t[apt.typeKey]}
              </small>
            </div>
            <span className={`appointment-status ${apt.statusKey}`}>{t[apt.statusKey]}</span>
          </article>
        ))}
      </section>

      <section className="follow-up">
        <div className="section-title">
          <h3>{t.followUp}</h3>
          <button type="button">{t.seeAll}</button>
        </div>

        <div className="patient-list">
          {followUpPatients.map((patient) => (
            <article key={patient.id} className="patient-card">
              <div className="patient-heading">
                <span className="patient-avatar">{patient.avatar}</span>
                <div>
                  <strong>
                    <bdi className="entity-name">{patient.name}</bdi>
                  </strong>
                  <small>
                    {t.patientLabel}: <bdi className="entity-name">{patient.guardian}</bdi>
                  </small>
                </div>
                <span className="status">{t[patient.statusKey]}</span>
              </div>
              <p>
                <span>{t.week} {patient.currentWeek} {t.of} {patient.totalWeeks}</span>
                <strong><bdi>{patient.progressPercent}%</bdi></strong>
              </p>
              <div className="progress">
                <span style={{ width: `${patient.progressPercent}%` }} />
              </div>
              <button type="button" className="details">{t.viewDetails}</button>
            </article>
          ))}
        </div>
      </section>
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
          <div className="brand-mark" aria-hidden="true">
            <span className="mark-head" />
            <span className="mark-body" />
            <span className="mark-arm" />
            <span className="mark-leg left" />
            <span className="mark-leg right" />
          </div>
          <div className="brand-name">KINEORA</div>
          <div className="tagline">{t.tagline}</div>
        </header>

        <div className="role-switch">
          <button
            type="button"
            className={role === 'doctor' ? 'active' : ''}
            onClick={() => setRole('doctor')}
          >
            🟡 {t.doctor}
          </button>
          <button
            type="button"
            className={role === 'parent' ? 'active' : ''}
            onClick={() => setRole('parent')}
          >
            👤 {t.parent}
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

  return currentPage === 'appointments' ? (
    <>
      <Topbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <Appointments />
    </>
  ) : (
    <Dashboard currentPage={currentPage} onNavigate={setCurrentPage} />
  );
}
