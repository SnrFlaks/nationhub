import { useEffect, useState } from "react";
import { Button, LogoTitle } from "@components/UI";
import useTheme from "@hooks/useTheme";
import mergeClasses from "@utils/mergeClasses";
import styles from "./Header.module.css";
import Input from "@components/UI/Input/Input";

interface HeaderProps {
  setSidebarActive: (active: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarActive }) => {
  const [isDarkMode, toggleTheme] = useTheme();
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
    <header
      className={mergeClasses(styles.headerContainer, isSearchMode, styles.searchMode)}
    >
      <div className={styles.start}>
        <Button
          icon="menu"
          aria-label="Open sidebar"
          onClick={() => setSidebarActive(true)}
        />
        <LogoTitle />
      </div>
      <div className={styles.center}>
        <Button
          icon="arrow_back"
          className={styles.backBtn}
          aria-label="Close search"
          onClick={toggleSearch}
        />
        <Input
          type="text"
          className={styles.searchInput}
          placeholder="Search..."
          aria-label="Search for a country"
          ref={(input) => isSearchMode && input && input.focus()}
        />
        <Button
          icon="search"
          className={styles.searchBtn}
          aria-label="Open search"
          onClick={toggleSearch}
        />
      </div>
      <div className={styles.end}>
        <Button
          icon={isDarkMode ? "dark_mode" : "light_mode"}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggleTheme}
        />
        <Button icon="settings" aria-label="Settings" />
      </div>
    </header>
  );
};

export default Header;
