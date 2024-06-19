import Button from "../Button/Button";
import "./Header.css";

const Header = () => {
  return (
    <header className="header-container">
      <div id="start" className="header">
        <h1 className="logo-title" />
      </div>
      <div id="center" className="header">
        <input type="text" className="search-input" placeholder="Search..." />
        <Button icon="filter_alt" />
      </div>
      <div id="end" className="header">
        <Button icon="light_mode" />
        <Button icon="settings" />
      </div>
    </header>
  );
};

export default Header;
