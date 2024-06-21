import { useEffect, useState } from "react";
import Button from "../Button/Button";
import "./Header.css";

const Header = () => {
  const initialTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const [isDarkMode, setIsDarkMode] = useState(initialTheme === "dark");

  useEffect(() => {
    document.documentElement.classList.add(initialTheme);
  }, [initialTheme]);

  const toggleTheme = () => {
    const theme = isDarkMode ? "light" : "dark";
    document.documentElement.classList.replace(
      isDarkMode ? "dark" : "light",
      theme
    );
    setIsDarkMode(!isDarkMode);
  };

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
