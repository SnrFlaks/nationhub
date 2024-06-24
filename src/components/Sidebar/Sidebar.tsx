import { useEffect, useState } from "react";
import "./Sidebar.css";
import Button from "../UI/Button/Button";
import { Country, fetchCountries } from "../../api/Countries";

interface SidebarProps {
  toggleSidebar: () => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleSidebar, isOpen }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  useEffect(() => {
    const loadCountries = async () => {
      const fetchedCountries = await fetchCountries({ independent: true });
      setCountries(fetchedCountries);
    };

    loadCountries();
  }, []);

  return (
    <div className={`sidebar-container${isOpen ? " open" : ""}`}>
      <div className="sidebar-header">
        <Button icon="menu" onClick={toggleSidebar} />
        <h1 className="logo-title" />
      </div>
      <table className="sidebar-content">
        <tbody>
          {countries
            .sort((a, b) => a.name.common.localeCompare(b.name.common))
            .map(({ cca2, name, flagUrl }) => (
              <tr
                key={cca2}
                className={`content-item ${
                  cca2 === selectedCountry ? "selected" : ""
                }`}
                onClick={() => setSelectedCountry(cca2)}
              >
                <td className="country-flag">
                  <img
                    src={flagUrl}
                    alt={`Flag of ${name.common}`}
                    className="country-flag img"
                  />
                </td>
                <td className="country-name">{name.common}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sidebar;
