import { useEffect, useState } from "react";
import useTheme from "../../hooks/useTheme";
import Button from "../UI/Button/Button";
import "./Header.css";

interface HeaderProps {
  toggleSidebar: () => void;
  toggleSearch: () => void;
  isClosed: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isSearchMode, setSearchMode] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setSearchMode(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSearch = () => {
    setSearchMode(!isSearchMode);
  };

  return (
    <header className={`header-container${isSearchMode ? " search-mode" : ""}`}>
      <div className="start">
        <Button icon="menu" onClick={toggleSidebar} />
        <div className="logo-container">
          <h1 className="logo-title" />
        </div>
      </div>
      <div className="center">
        <Button icon="arrow_back" className="back-btn" onClick={toggleSearch} />
        <input type="text" className="search-input" placeholder="Search..." />
        <Button icon="search" className="search-btn" onClick={toggleSearch} />
        <Button icon="filter_alt" />
      </div>
      <div className="end">
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
