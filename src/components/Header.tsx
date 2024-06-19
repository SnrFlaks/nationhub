import Button from "./Button";
import "./Header.css";

const Header = () => {
  return (
    <header className="header-container">
      <div id="start" className="header">
        <h1 className="logo-title" />
      </div>
      <div id="center" className="header">
        <input type="text" className="search-input" placeholder="Search..." />
        <button>Filter</button>
      </div>
      <div id="end" className="header">
        <button>Theme</button>
        <button>Settings</button>
      </div>
    </header>
  );
};

export default Header;
