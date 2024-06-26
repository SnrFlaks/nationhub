import { useEffect, useState } from "react";
import useTheme from "@hooks/useTheme";
import Button from "@components/UI/Button/Button";
import LogoTitle from "@components/UI/LogoTitle/LogoTitle";
import styles from "./Header.module.css";

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
      className={`${styles.headerContainer}${
        isSearchMode ? ` ${styles.searchMode}` : ""
      }`}
    >
      <div className={styles.start}>
        <Button icon="menu" onClick={() => setSidebarActive(true)} />
        <LogoTitle />
      </div>
      <div className={styles.center}>
        <Button icon="arrow_back" className={styles.backBtn} onClick={toggleSearch} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search..."
          ref={(input) => isSearchMode && input && input.focus()}
        />
        <Button icon="search" className={styles.searchBtn} onClick={toggleSearch} />
      </div>
      <div className={styles.end}>
        <Button icon={isDarkMode ? "dark_mode" : "light_mode"} onClick={toggleTheme} />
        <Button icon="settings" />
      </div>
    </header>
  );
};

export default Header;
