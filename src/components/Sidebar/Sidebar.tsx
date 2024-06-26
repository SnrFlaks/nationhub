import { useEffect, useState } from "react";
import "./Sidebar.css";
import Button from "@components/UI/Button/Button";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  StyledEngineProvider,
} from "@mui/material";
import { Country, countryService } from "@api/CountryService";

interface SidebarProps {
  toggleSidebar: () => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleSidebar, isOpen }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const loadCountries = async () => {
      const sortedCountries = await countryService.getSortedCountries(
        sortOption as keyof Country | "name",
        sortOrder as "asc" | "desc"
      );
      setCountries(sortedCountries);
    };

    loadCountries();
  }, [sortOption, sortOrder]);

  const handleSortChange = async (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value);
    setSortOrder("asc");
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className={`sidebar-container${isOpen ? " open" : ""}`}>
      <div className="sidebar-header">
        <Button icon="menu" onClick={toggleSidebar} />
        <h1 className="logo-title" />
      </div>
      <div className="sidebar-settings">
        <div className="sort-dropdown">
          <Button icon="swap_vert" onClick={toggleSortOrder} />
          <StyledEngineProvider injectFirst>
            <FormControl>
              <Select value={sortOption} onChange={handleSortChange}>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="area">Area</MenuItem>
                <MenuItem value="population">Population</MenuItem>
              </Select>
            </FormControl>
          </StyledEngineProvider>
        </div>
        <Button icon="filter_alt" className="filter-btn" />
      </div>
      <div className="sidebar-content">
        <table>
          <tbody>
            {countries.map(({ cca2, name, flagUrl }) => (
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
    </div>
  );
};

export default Sidebar;
