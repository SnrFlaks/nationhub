import useTheme from "../../hooks/useTheme";
import Button from "../Button/Button";
import "./Header.css";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="header-container">
      <div id="start" className="header">
        <h1 className="logo-title" />
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
