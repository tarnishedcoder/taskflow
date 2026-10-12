import { useTheme } from '../ThemeContext';
import './Header.css';

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <h1>TaskFlow</h1>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark mode' : '☀️ Light mode'}
      </button>
    </header>
  );
}

export default Header;