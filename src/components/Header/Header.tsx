import useTheme from "../../hooks/useTheme";
import Button from "../UI/Button/Button";
import "./Header.css";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="header-container">
      <div id="start" className="header">
        <Button icon="menu" onClick={toggleSidebar} />
        <div className="logo-container">
          <h1 className="logo-title" />
        </div>
      </div>
      <div id="center" className="header">
        <input type="text" className="search-input" placeholder="Search..." />
        <Button icon="search" className="search-btn" />
        <Button icon="filter_alt" />
      </div>
      <div id="end" className="header">
        <Button
          icon={isDarkMode ? "dark_mode" : "light_mode"}
          onClick={toggleTheme}
        />
        <Button icon="settings" />
      </div>
    </header>
  );
};

export default Header;
