import { useEffect, useState } from "react";
import { Button, LogoTitle, Select } from "@components/UI";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import { Country, countryService } from "@api/CountryService";
import mergeClasses from "@utils/mergeClasses";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  isActive: boolean;
  setActive: (active: boolean) => void;
  filteredCountries: Country[];
  selectedCountry: string;
  setSelectedCountry: (selected: string) => void;
  setFilterActive: (active: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isActive,
  setActive,
  filteredCountries,
  selectedCountry,
  setSelectedCountry,
  setFilterActive,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [sortOption, setSortOption] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const loadCountries = async () => {
      const sortedCountries = await countryService.getSortedCountries(
        filteredCountries,
        sortOption as keyof Country | "name",
        sortOrder as "asc" | "desc"
      );
      setCountries(sortedCountries);
    };

    loadCountries();
  }, [filteredCountries, sortOption, sortOrder]);

  const handleSortChange = async (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value);
    setSortOrder("asc");
  };

  return (
    <div className={mergeClasses(styles.sidebarContainer, isActive, styles.open)}>
      <div className={styles.sidebarHeader}>
        <Button icon="menu" aria-label="Close sidebar" onClick={() => setActive(false)} />
        <LogoTitle />
      </div>
      <div className={styles.sidebarSettings}>
        <div className={styles.sortDropdown}>
          <Button
            icon="swap_vert"
            aria-label={`Sort by ${
              sortOrder === "asc" ? "descending" : "ascending"
            } order`}
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          />
          <Select value={sortOption} onChange={handleSortChange}>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="area">Area</MenuItem>
            <MenuItem value="population">Population</MenuItem>
          </Select>
        </div>
        <Button
          icon="filter_alt"
          className={styles.filterBtn}
          aria-label="Open filter options"
          onClick={() => setFilterActive(true)}
        />
      </div>
      <div className={styles.sidebarContent}>
        <table className={styles.contentTable}>
          <tbody>
            {countries.map(({ cca2, name, flagSvg }) => (
              <tr
                key={cca2}
                className={mergeClasses(
                  styles.contentItem,
                  cca2 === selectedCountry,
                  styles.selected
                )}
                onClick={() => setSelectedCountry(cca2)}
              >
                <td className={styles.countryFlag}>
                  <img
                    src={`data:image/svg+xml,${encodeURIComponent(flagSvg)}`}
                    alt={`Flag of ${name}`}
                    className={`${styles.countryFlag} img`}
                  />
                </td>
                <td className={styles.countryName}>{name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sidebar;
