import usePreferences from '../hooks/usePreferences.js';
import LanguageThemePicker from './LanguageThemePicker.jsx';

function Topbar({ currentPage = 'home', onNavigate = () => {} }) {
  const prefs = usePreferences();
  const labels = prefs.t;

  return (
    <header className="topbar">
      <strong>KINEORA</strong>

      <nav>
        <button
          type="button"
          className={currentPage === 'home' ? 'active' : ''}
          onClick={() => onNavigate('home')}
        >
          {labels.home}
        </button>

        <button type="button" disabled>
          {labels.patients}
        </button>

        <button
          type="button"
          className={currentPage === 'appointments' ? 'active' : ''}
          onClick={() => onNavigate('appointments')}
        >
          {labels.appointments}
        </button>

        <button type="button" disabled>
          {labels.reports}
        </button>
      </nav>

      <LanguageThemePicker className="topbar-tools" />
    </header>
  );
}

export default Topbar;
