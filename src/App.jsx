import { useEffect, useState } from 'react';
import {
  Activity, Eye, EyeOff, Heart, LockKeyhole, Mail,
  ShieldCheck, Sparkles, UsersRound,
} from 'lucide-react';
import Topbar from './components/Topbar.jsx';

const languages = {
  en: {
    email: 'Email address',
    password: 'Password',
    forgot: 'Forgot password?',
    signIn: 'Sign in',
    noAccount: 'No account yet?',
    signUp: 'Sign up',
    doctor: 'Doctor — web dashboard',
    parent: 'Parent — mobile app',
    greeting: 'Hello, Dr. Ahmed Ben Ali 👋',
    summary: 'You have 6 sessions and 3 alerts today.',
    start: 'Start the day',
    totalPatients: 'Total patients',
    sessions: "Today's sessions",
    adherence: 'Avg adherence',
    alerts: 'Alerts',
    today: 'Today',
    seeAll: 'See all',
    checkup: 'Check-up',
    xray: 'X-ray',
    confirmed: 'Confirmed',
    pending: 'Pending',
    followUp: 'Patient follow-up',
    patientFatima: 'Patient: Fatima',
    patientFarid: 'Patient: Farid',
    followUpStatus: 'Follow-up',
    deviceInactive: 'Device inactive',
    week: 'Week',
    of: 'of',
    viewDetails: 'View details',
    home: 'Home',
    patients: 'Patients',
    appointments: 'Appointments',
    reports: 'Reports',
    trust: 'Trust',
    wellbeing: 'Well-being',
    progress: 'Progress',
    humanity: 'Humanity',
    innovation: 'Innovation',
    resetNotice: 'Password reset is not set up yet.',
    signupNotice: 'Sign up is not set up yet.',
  },
  fr: {
    email: 'Adresse e-mail',
    password: 'Mot de passe',
    forgot: 'Mot de passe oublié ?',
    signIn: 'Se connecter',
    noAccount: 'Pas encore de compte ?',
    signUp: 'Créer un compte',
    doctor: 'Médecin — tableau de bord web',
    parent: 'Parent — application mobile',
    greeting: 'Bonjour, Dr Ahmed Ben Ali 👋',
    summary: 'Vous avez 6 séances et 3 alertes aujourd’hui.',
    start: 'Commencer la journée',
    totalPatients: 'Patients au total',
    sessions: 'Séances du jour',
    adherence: 'Adhésion moyenne',
    alerts: 'Alertes',
    today: 'Aujourd’hui',
    seeAll: 'Tout voir',
    checkup: 'Consultation',
    xray: 'Radiographie',
    confirmed: 'Confirmé',
    pending: 'En attente',
    followUp: 'Suivi des patients',
    patientFatima: 'Patiente : Fatima',
    patientFarid: 'Patient : Farid',
    followUpStatus: 'À suivre',
    deviceInactive: 'Appareil inactif',
    week: 'Semaine',
    of: 'sur',
    viewDetails: 'Voir les détails',
    home: 'Accueil',
    patients: 'Patients',
    appointments: 'Rendez-vous',
    reports: 'Rapports',
    trust: 'Confiance',
    wellbeing: 'Bien-être',
    progress: 'Progrès',
    humanity: 'Humanité',
    innovation: 'Innovation',
    resetNotice: 'La réinitialisation du mot de passe n’est pas encore configurée.',
    signupNotice: 'La création de compte n’est pas encore configurée.',
  },
  ar: {
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    forgot: 'نسيت كلمة المرور؟',
    signIn: 'تسجيل الدخول',
    noAccount: 'ما عندكش حساب؟',
    signUp: 'سجّل الآن',
    doctor: 'طبيب — لوحة ويب',
    parent: 'وليّ — تطبيق الهاتف',
    greeting: 'مرحبًا د. أحمد بن علي 👋',
    summary: 'عندك 6 حصص و3 تنبيهات اليوم.',
    start: 'ابدأ اليوم',
    totalPatients: 'مجموع المرضى',
    sessions: 'حصص اليوم',
    adherence: 'متوسط الالتزام',
    alerts: 'التنبيهات',
    today: 'اليوم',
    seeAll: 'عرض الكل',
    checkup: 'فحص',
    xray: 'أشعة',
    confirmed: 'مؤكد',
    pending: 'قيد الانتظار',
    followUp: 'متابعة المرضى',
    patientFatima: 'المريضة: فاطمة',
    patientFarid: 'المريض: فريد',
    followUpStatus: 'تحتاج متابعة',
    deviceInactive: 'الجهاز غير نشط',
    week: 'الأسبوع',
    of: 'من',
    viewDetails: 'عرض التفاصيل',
    home: 'الرئيسية',
    patients: 'المرضى',
    appointments: 'المواعيد',
    reports: 'التقارير',
    trust: 'الثقة',
    wellbeing: 'العافية',
    progress: 'التقدم',
    humanity: 'الإنسانية',
    innovation: 'الابتكار',
    resetNotice: 'إعادة تعيين كلمة المرور غير مفعّلة بعد.',
    signupNotice: 'إنشاء الحساب غير مفعّل بعد.',
  },
};

function Dashboard({ language, setLanguage, darkMode, toggleDarkMode }) {
  const t = languages[language];

  return (
    <main className={`dashboard ${language === 'ar' ? 'rtl' : ''}`}>
      <Topbar
        labels={t}
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <section className="welcome-card">
        <div>
          <h2>{t.greeting}</h2>
          <p>{t.summary}</p>
        </div>
        <button>{t.start}</button>
      </section>

      <section className="stats">
        <article><strong>24</strong><span>{t.totalPatients}</span></article>
        <article><strong>6</strong><span>{t.sessions}</span></article>
        <article><strong>82%</strong><span>{t.adherence}</span></article>
        <article><strong>3</strong><span>{t.alerts}</span></article>
      </section>

      <section className="today">
        <div className="section-title">
          <h3>{t.today}</h3>
          <button>{t.seeAll}</button>
        </div>

        <article className="appointment">
          <div className="date-box"><strong>03</strong><small>Nov</small></div>
          <div className="appointment-info">
            <strong>Yacine</strong>
            <small>09:30 • {t.checkup}</small>
          </div>
          <span className="appointment-status confirmed">{t.confirmed}</span>
        </article>

        <article className="appointment">
          <div className="date-box"><strong>03</strong><small>Nov</small></div>
          <div className="appointment-info">
            <strong>Amira</strong>
            <small>11:00 • {t.xray}</small>
          </div>
          <span className="appointment-status pending">{t.pending}</span>
        </article>
      </section>

      <section className="follow-up">
        <div className="section-title">
          <h3>{t.followUp}</h3>
          <button>{t.seeAll}</button>
        </div>

        <div className="patient-list">
          <article className="patient-card">
            <div className="patient-heading">
              <span className="patient-avatar">Y</span>
              <div><strong>Yacine</strong><small>{t.patientFatima}</small></div>
              <span className="status">{t.followUpStatus}</span>
            </div>
            <p>{t.week} 4 {t.of} 6 <strong>68%</strong></p>
            <div className="progress"><span style={{ width: '68%' }} /></div>
            <button className="details">{t.viewDetails}</button>
          </article>

          <article className="patient-card">
            <div className="patient-heading">
              <span className="patient-avatar">A</span>
              <div><strong>Amira</strong><small>{t.patientFarid}</small></div>
              <span className="status">{t.deviceInactive}</span>
            </div>
            <p>{t.week} 3 {t.of} 6 <strong>38%</strong></p>
            <div className="progress"><span style={{ width: '38%' }} /></div>
            <button className="details">{t.viewDetails}</button>
          </article>
        </div>
      </section>
    </main>
  );
}

function Login({ language, setLanguage, darkMode, toggleDarkMode, onLogin }) {
  const [role, setRole] = useState('doctor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');
  const t = languages[language];

  function handleSubmit(event) {
    event.preventDefault();
    onLogin();
  }

  return (
    <main className={`page ${language === 'ar' ? 'rtl' : ''}`}>
      <nav className="language-picker">
        <button onClick={() => setLanguage('ar')}>🇩🇿</button>
        <button onClick={() => setLanguage('fr')}>🇫🇷</button>
        <button onClick={() => setLanguage('en')}>🇬🇧</button>
        <button onClick={toggleDarkMode}>{darkMode ? '☀️' : '🌙'}</button>
      </nav>

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
          <div className="tagline">Rehab • Track • Progress</div>
        </header>

        <div className="role-switch">
          <button
            className={role === 'doctor' ? 'active' : ''}
            onClick={() => setRole('doctor')}
          >
            🟡 {t.doctor}
          </button>
          <button
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
  const [language, setLanguage] = useState('en');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  function toggleDarkMode() {
    setDarkMode((current) => !current);
  }

  return loggedIn ? (
    <Dashboard
      language={language}
      setLanguage={setLanguage}
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
    />
  ) : (
    <Login
      language={language}
      setLanguage={setLanguage}
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
      onLogin={() => setLoggedIn(true)}
    />
  );
}