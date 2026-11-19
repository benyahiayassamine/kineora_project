import { useState } from 'react';
import usePreferences from '../hooks/usePreferences.js';
import { currentDoctor } from '../data/mockData.js';
import kineoraLogo from '../assets/kineora-logo.png';
import {
  LogOut,
  Bell,
  Bot,
  MessageCircle,
  UserRound,
  Settings,
} from 'lucide-react';

export default function Topbar({
  onLogout,
  currentPage = 'home',
  onNavigate = () => {},
}) {
  const { t, language } = usePreferences();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const labels = {
    en: { profile: 'Profile', settings: 'Settings', logout: 'Logout' },
    fr: { profile: 'Profil', settings: 'Paramètres', logout: 'Déconnexion' },
    ar: { profile: 'الملف الشخصي', settings: 'الإعدادات', logout: 'تسجيل الخروج' },
  };

  const menuLabels = labels[language] || labels.en;

  const navigateFromMenu = (page) => {
    setProfileMenuOpen(false);
    onNavigate(page);
  };

  const handleLogout = () => {
    setProfileMenuOpen(false);
    onLogout();
  };

  return (
    <header className="topbar">
      <div className="topbar-brand">
        <img className="topbar-logo" src={kineoraLogo} alt="" />
        <strong>KINEORA</strong>
      </div>

      <nav className="topbar-nav">
        <button
          type="button"
          className={currentPage === 'home' ? 'active' : ''}
          onClick={() => onNavigate('home')}
        >
          {t.home}
        </button>

        <button
          type="button"
          className={currentPage === 'patients' ? 'active' : ''}
          onClick={() => onNavigate('patients')}
        >
          {t.patients}
        </button>

        <button
          type="button"
          className={currentPage === 'appointments' ? 'active' : ''}
          onClick={() => onNavigate('appointments')}
        >
          {t.appointments}
        </button>

        <button
          type="button"
          className={`topbar-chat-link ${currentPage === 'chat' ? 'active' : ''}`}
          onClick={() => onNavigate('chat')}
        >
          <MessageCircle size={12} />
          <span>{t.patientsChat}</span>
        </button>

        <button
          type="button"
          className={`topbar-static-item ${currentPage === 'assistant' ? 'active' : ''}`}
          onClick={() => onNavigate('assistant')}
        >
          <Bot size={12} />
          <span>{t.aiAssistant}</span>
        </button>

        <button
          type="button"
          className={currentPage === 'reports' ? 'active' : ''}
          onClick={() => onNavigate('reports')}
        >
          {t.reports}
        </button>
      </nav>

      <div className="topbar-actions">
        <button
          className="topbar-notifications"
          type="button"
          aria-label="Notifications"
        >
          <Bell size={14} />
          <span />
        </button>

        <div className="topbar-profile">
          <button
            type="button"
            className="topbar-profile-trigger"
            onClick={() => setProfileMenuOpen((open) => !open)}
            aria-label={menuLabels.profile}
            aria-expanded={profileMenuOpen}
            aria-haspopup="true"
          >
            <UserRound size={18} />
            <bdi>{currentDoctor.name}</bdi>
          </button>

          {profileMenuOpen && (
            <div className="topbar-profile-dropdown">
              <button
                type="button"
                className={currentPage === 'profile' ? 'active' : ''}
                onClick={() => navigateFromMenu('profile')}
              >
                <UserRound size={16} />
                <span>{menuLabels.profile}</span>
              </button>

              <button
                type="button"
                className={currentPage === 'settings' ? 'active' : ''}
                onClick={() => navigateFromMenu('settings')}
              >
                <Settings size={16} />
                <span>{menuLabels.settings}</span>
              </button>

              <button
                type="button"
                className="topbar-dropdown-logout"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>{menuLabels.logout}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
