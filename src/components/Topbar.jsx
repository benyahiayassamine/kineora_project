import usePreferences from '../hooks/usePreferences.js';
import LanguageThemePicker from './LanguageThemePicker.jsx';
import { currentDoctor } from '../data/mockData.js';
import kineoraLogo from '../assets/kineora-logo.png';
import { LogOut, Bell, Bot, MessageCircle } from 'lucide-react';

export default function Topbar({
  onLogout,
  currentPage = 'home',
  onNavigate = () => {},
}) {
  const { t } = usePreferences();

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

        <button type="button" className={currentPage === 'reports' ? 'active' : ''} onClick={() => onNavigate('reports')}>{t.reports}</button>
        <button
  type="button"
  className={currentPage === 'settings' ? 'active' : ''}
  onClick={() => onNavigate('settings')}
>
  Settings
</button>
      </nav>

      <div className="topbar-actions">
        <button className="topbar-notifications" type="button" aria-label="Notifications">
           <Bell size={14} />
           <span />
        </button>
        <LanguageThemePicker />

        <span className="doctor-name">
          <span className="doctor-icon" aria-hidden="true">
            🧑‍⚕️
          </span>
          <bdi>{currentDoctor.name}</bdi>
        </span>

        <button
          type="button"
          className="logout-button"
          onClick={onLogout}
        >
          <LogOut size={14} />
          {t.logout || 'Logout'}
        </button>
      </div>
    </header>
  );
}
