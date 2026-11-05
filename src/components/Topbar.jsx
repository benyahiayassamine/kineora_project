import usePreferences from '../hooks/usePreferences.js';
import LanguageThemePicker from './LanguageThemePicker.jsx';

function Topbar(props) {
  const prefs = usePreferences();
  const labels = props.labels || prefs.t;

  return (
    <header className="topbar">
      <strong>KINEORA</strong>

      <nav>
        <button type="button" className="active">{labels.home}</button>
        <button type="button">{labels.patients}</button>
        <button type="button">{labels.appointments}</button>
        <button type="button">{labels.reports}</button>
      </nav>

      <LanguageThemePicker className="topbar-tools" />
    </header>
  );
}

export default Topbar;
