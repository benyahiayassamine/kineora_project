import usePreferences from '../hooks/usePreferences.js';
import LanguageThemePicker from './LanguageThemePicker.jsx';
import { currentDoctor } from '../data/mockData.js';
import kineoraLogo from '../assets/kineora-logo.png';
import { LogOut } from 'lucide-react';

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
