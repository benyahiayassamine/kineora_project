import { useState } from 'react';
import usePreferences from '../hooks/usePreferences.js';
import kineoraLogo from '../assets/kineora-logo.png';
import {
  LogOut,
  Bell,
  Bot,
  MessageCircle,
  UserRound,
  Settings,
  House,
  UsersRound,
  CalendarDays,
  FileText,
} from 'lucide-react';
import { currentDoctor, statsData } from '../data/mockData.js';

export default function Topbar({
  onLogout,
  currentPage = 'home',
  onNavigate = () => {},
}) {
  const { t, language } = usePreferences();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const labels = {
    en: { profile: 'Profile', settings: 'Settings', logout: 'Logout' },
    fr: { profile: 'Profil', settings: 'Paramètres', logout: 'Déconnexion' },
    ar: { profile: 'الملف الشخصي', settings: 'الإعدادات', logout: 'تسجيل الخروج' },
  };

  const menuLabels = labels[language] || labels.en;

  return (
    <aside className="topbar dashboard-sidebar">
      <div className="topbar-brand">
        <img className="topbar-logo" src={kineoraLogo} alt="" />
        <strong>KINEORA</strong>
      </div>

      <nav className="topbar-nav">
        <button
          type="button"
          title={t.home}
          className={currentPage === 'home' ? 'active' : ''}
          onClick={() => onNavigate('home')}
        >
          <House size={17} />
          {t.home}
        </button>

        <button
          type="button"
          title={t.patients}
          className={currentPage === 'patients' ? 'active' : ''}
          onClick={() => onNavigate('patients')}
        >
          <UsersRound size={17} />
          {t.patients}
        </button>

        <button
          type="button"
          title={t.appointments}
          className={currentPage === 'appointments' ? 'active' : ''}
          onClick={() => onNavigate('appointments')}
        >
          <CalendarDays size={17} />
          {t.appointments}
        </button>

        <button
          type="button"
          title={t.patientsChat}
          className={`topbar-chat-link ${currentPage === 'chat' ? 'active' : ''}`}
          onClick={() => onNavigate('chat')}
        >
          <MessageCircle size={17} />
          <span>{t.patientsChat}</span>
        </button>

        <button
          type="button"
          title={t.aiAssistant}
          className={`topbar-static-item ${currentPage === 'assistant' ? 'active' : ''}`}
          onClick={() => onNavigate('assistant')}
        >
          <Bot size={17} />
          <span>{t.aiAssistant}</span>
        </button>

        <button
          type="button"
          title={t.reports}
          className={currentPage === 'reports' ? 'active' : ''}
          onClick={() => onNavigate('reports')}
        >
          <FileText size={17} />
          {t.reports}
        </button>

        <button
          type="button"
          title={menuLabels.settings}
          className={currentPage === 'settings' ? 'active' : ''}
          onClick={() => onNavigate('settings')}
        >
          <Settings size={17} />
          {menuLabels.settings}
        </button>
      </nav>

      <button
        type="button"
        className="sidebar-logout"
        title={menuLabels.logout}
        onClick={onLogout}
      >
        <LogOut size={17} />
        <span>{menuLabels.logout}</span>
      </button>

      <div className="topbar-actions">
        <div className="topbar-notification-wrap">
          <button
            className="topbar-notifications"
            type="button"
            aria-label={t.notifications}
            aria-expanded={notificationsOpen}
            aria-haspopup="true"
            onClick={() => setNotificationsOpen((open) => !open)}
          >
            <Bell size={18} />
            <span />
          </button>
          {notificationsOpen && (
            <section className="topbar-notification-panel" aria-label={t.notifications}>
              <h2>{t.notifications}</h2>
              <p>{t.alerts}: <strong>{statsData.alertsCount}</strong></p>
              <p>{t.sessions}: <strong>{statsData.sessionsToday}</strong></p>
            </section>
          )}
        </div>

        <div className="topbar-profile">
          <button
            type="button"
            className="topbar-profile-trigger"
            onClick={() => onNavigate('profile')}
            aria-label={menuLabels.profile}
          >
            <UserRound size={18} />
            <bdi>{currentDoctor.name}</bdi>
          </button>
        </div>

      </div>
    </aside>
  );
}
