import { useEffect, useState } from "react";
import "./Sidebar.css";
import Button from "../Button/Button";

interface Country {
  name: {
    common: string;
  };
  cca2: string;
  independent: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleSidebar, isOpen }) => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        const data = await response.json();
        const independentCountries = data.filter(
          (country: Country) => country.independent
        );
        setCountries(independentCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchData();
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
            .map(({ cca2, name }) => (
              <tr key={cca2} className="content-item">
                <td className="country-flag">
                  <picture className="country-flag picture">
                    <source
                      type="image/png"
                      srcSet={`https://flagcdn.com/h80/${cca2.toLowerCase()}.png,
                               https://flagcdn.com/h160/${cca2.toLowerCase()}.png 2x,
                               https://flagcdn.com/h240/${cca2.toLowerCase()}.png 3x`}
                    />
                    <img
                      src={`https://flagcdn.com/h40/${cca2.toLowerCase()}.png`}
                      alt={`Flag of ${name.common}`}
                      className="country-flag picture img"
                    />
                  </picture>
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
