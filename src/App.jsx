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
  Phone,
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
import PatientsChatPage from './pages/PatientsChatPage.jsx';
import AIAssistantPage from './pages/AIAssistantPage.jsx';
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
    onNavigate={(page) => {
      setSelectedPatient(null);
      onNavigate(page);
    }}
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
      ) : currentPage === 'chat' ? (
        <PatientsChatPage />
      ) : currentPage === 'assistant' ? (
        <AIAssistantPage />
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
const DEMO_USERS_KEY = 'kineora-demo-users';
const LAST_LOGIN_IDENTIFIER_KEY = 'kineora-last-login-identifier';
const PASSWORD_HASH_ITERATIONS = 120000;

function readLastLoginIdentifier() {
  try {
    return localStorage.getItem(LAST_LOGIN_IDENTIFIER_KEY) || '';
  } catch {
    return '';
  }
}

function readDemoUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(DEMO_USERS_KEY) || '[]');
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

function toHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}


async function hashPassword(password, salt = crypto.getRandomValues(new Uint8Array(16))) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: PASSWORD_HASH_ITERATIONS, hash: 'SHA-256' },
    key,
    256,
  );
  return { salt: toHex(salt), passwordHash: toHex(new Uint8Array(bits)) };
}

function normalizePhone(value) {
  return value.trim().replace(/[\s().-]/g, '');
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function matchesDemoIdentifier(user, identifier) {
  const value = identifier.trim();
  if (value.includes('@')) return user.email === value.toLowerCase();
  return Boolean(user.phoneNumber) && normalizePhone(user.phoneNumber) === normalizePhone(value);
}

function isStrongPassword(password) {
  return password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password);
}

function Login({ onLogin }) {
  const { t, language } = usePreferences();
  const [mode, setMode] = useState('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [identifier, setIdentifier] = useState(readLastLoginIdentifier);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');
  const [noticeType, setNoticeType] = useState('error');
  const [submitting, setSubmitting] = useState(false);

  function changeMode(nextMode) {
    setMode(nextMode);
    setNotice('');
    setNoticeType('error');
    setPassword('');
    setConfirmPassword('');
  }

   async function handleSubmit(event) {
    event.preventDefault();
    setNotice('');
    setNoticeType('error');
    setSubmitting(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedPhone = normalizePhone(phoneNumber);
      const normalizedIdentifier = identifier.trim();
      const users = readDemoUsers();

      if (mode === 'signup') {
        if (!isValidEmail(normalizedEmail)) {
          setNotice(t.invalidEmail);
          return;
        }

        if (!isStrongPassword(password)) {
          setNotice(t.passwordRequirements);
          return;
        }

        if (password !== confirmPassword) {
          setNotice(t.passwordMismatch);
          return;
        }

        const phoneDigits = normalizedPhone.replace(/\D/g, '');
        if (
          !/^\+?[\d().\s-]+$/.test(phoneNumber.trim()) ||
          phoneDigits.length < 8 ||
          phoneDigits.length > 15
        ) {
          setNotice(t.invalidPhone);
          return;
        }

        if (
          users.some(
            (user) =>
              user.email === normalizedEmail ||
              (user.phoneNumber &&
                normalizePhone(user.phoneNumber) === normalizedPhone),
          )
        ) {
          setNotice(t.accountExists);
          return;
        }

        const credentials = await hashPassword(password);
        users.push({
          fullName: fullName.trim(),
          email: normalizedEmail,
          phoneNumber: normalizedPhone,
          ...credentials,
        });

        localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
        setMode('signin');
        setFullName('');
        setIdentifier(normalizedEmail);
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        setConfirmPassword('');
        setNoticeType('success');
        setNotice(t.accountCreated);
        return;
      }

      if (mode === 'forgot') {
        if (!isStrongPassword(password)) {
          setNotice(t.passwordRequirements);
          return;
        }

        if (password !== confirmPassword) {
          setNotice(t.passwordMismatch);
          return;
        }

        const userIndex = users.findIndex((user) =>
          matchesDemoIdentifier(user, normalizedIdentifier),
        );

        if (userIndex < 0) {
          setNotice(t.accountNotFound);
          return;
        }

        users[userIndex] = {
          ...users[userIndex],
          ...(await hashPassword(password)),
        };

        localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
        setMode('signin');
        setPassword('');
        setConfirmPassword('');
        setNoticeType('success');
        setNotice(t.passwordResetDone);
        return;
      }

      try {
        localStorage.setItem(
          LAST_LOGIN_IDENTIFIER_KEY,
          normalizedIdentifier,
        );
      } catch {
        // Continue if browser storage is unavailable.
      }

      onLogin();
      return;
    } catch {
      setNotice(t.authStorageError);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <main className={`page ${language === 'ar' ? 'rtl' : ''}`}>
      <LanguageThemePicker className="language-picker" />

      <section className={`login-column auth-${mode}`}>
        <header className="brand">
          <img className="login-logo" src={kineoraLogo} alt="" />
          <div className="brand-name">KINEORA</div>
          <div className="tagline">{t.tagline}</div>
        </header>

        <form
               className={`card sign-in-card auth-form-${mode}`}
               onSubmit={handleSubmit}
        >
          {mode === 'signup' && (
            <label className="input-wrap auth-field-name">
              <UserRound size={15} />
              <input
                type="text"
                placeholder={t.fullName}
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                autoComplete="name"
                required
              />
            </label>
          )}

          {mode === 'signup' ? (
            <>
              <label className="input-wrap auth-field-email">
                <Mail size={15} />
                <input
                  type="email"
                  placeholder={t.email}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onInvalid={(event) => {
                    event.preventDefault();
                    setNoticeType('error');
                    setNotice(t.invalidEmail);
                  }}
                  autoComplete="email"
                  required
                />
              </label>
              <label className="input-wrap auth-field-phone">
                <Phone size={15} />
                <input
                  type="tel"
                  placeholder={t.phoneNumber}
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  onInvalid={(event) => {
                    event.preventDefault();
                    setNoticeType('error');
                    setNotice(t.invalidPhone);
                  }}
                  autoComplete="tel"
                  required
                />
              </label>
            </>
          ) : (
            <label className="input-wrap auth-field-email">
              <Mail size={15} />
              <input
                type="text"
                placeholder={t.emailOrPhone}
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                autoComplete="username"
                required
              />
            </label>
          )}

          <label className={`input-wrap ${mode === 'signup' ? 'auth-field-password' : ''}`}>
            <LockKeyhole size={15} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={mode === 'forgot' ? t.newPassword : t.password}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onInvalid={(event) => {
                event.preventDefault();
                setNoticeType('error');
                setNotice(mode === 'signin' ? t.invalidCredentials : t.passwordRequirements);
              }}
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              minLength={8}
              required
            />
            <button
              type="button"
              className="eye-button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={t.togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </label>

          {mode !== 'signin' && (
            <label className="input-wrap auth-field-confirm">
              <LockKeyhole size={15} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={t.confirmPassword}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                onInvalid={(event) => {
                  event.preventDefault();
                  setNoticeType('error');
                  setNotice(t.passwordRequirements);
                }}
                autoComplete="new-password"
                minLength={8}
                required
              />
            </label>
          )}

          {mode === 'signin' && (
            <button className="forgot" type="button" onClick={() => changeMode('forgot')}>
              {t.forgot}
            </button>
          )}

          <button className="submit-button" type="submit" disabled={submitting}>
            {submitting
              ? t.pleaseWait
              : mode === 'signup'
                ? t.createAccount
                : mode === 'forgot'
                  ? t.resetPassword
                  : t.signIn}
          </button>

          <p className="signup-line">
            {mode === 'signin' ? t.noAccount : mode === 'signup' ? t.hasAccount : t.rememberPassword}{' '}
            <button
              type="button"
              onClick={() => changeMode(mode === 'signin' ? 'signup' : 'signin')}
            >
              {mode === 'signin' ? t.signUp : t.backToSignIn}
            </button>
          </p>

          {notice && <p className={`notice ${noticeType}`} role={noticeType === 'error' ? 'alert' : 'status'}>{notice}</p>}
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
