import LanguageThemePicker from './LanguageThemePicker.jsx';
import usePreferences from '../hooks/usePreferences.js';
import { currentDoctor } from '../data/mockData.js';
import kineoraLogo from '../assets/kineora-logo.png';
import {  LogOut } from 'lucide-react';

export default function Topbar({ onLogout, activePage, onNavigate }) {
  const { t } = usePreferences();

  return (
    <header className="topbar">
      <div className="topbar-brand">
        <img className="topbar-logo" src={kineoraLogo} alt="" />
        <strong>KINEORA</strong>
      </div>

      <nav className="topbar-nav">
        <button
  className={activePage === 'home' ? 'active' : ''}
  onClick={() => onNavigate('home')}
>
  {t.home}
</button>

<button
  className={activePage === 'patients' ? 'active' : ''}
  onClick={() => onNavigate('patients')}
>
  {t.patients}
</button>
        <a href="#appointments">{t.appointments}</a>
        <a href="#reports">{t.reports}</a>
      </nav>

      <div className="topbar-actions">
        <LanguageThemePicker />
        <span className="doctor-name">
          
          <span className="doctor-icon" aria-hidden="true">🧑‍⚕️</span>
          <bdi>{currentDoctor.name}</bdi>
        </span>
        <button className="logout-button" onClick={onLogout}>
          <LogOut size={14} />
          {t.logout || 'Logout'}
        </button>
      </div>
    </header>
  );
}