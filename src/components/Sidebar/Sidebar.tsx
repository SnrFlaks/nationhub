import { useEffect, useState } from "react";
import { Button, LogoTitle, Select } from "@components/UI";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import { Country, countryService } from "@api/CountryService";
import FilterModal from "@components/FilterModal/FilterModal";
import mergeClasses from "@utils/mergeClasses";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  isActive: boolean;
  setActive: (active: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isActive, setActive }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterOptions, setFilterOptions] = useState<Partial<Country>>({
    independent: true,
    unMember: true,
  });
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  useEffect(() => {
    const loadCountries = async () => {
      const filteredCountries = await countryService.getFilteredCountries(filterOptions);
      const sortedCountries = await countryService.getSortedCountries(
        filteredCountries,
        sortOption as keyof Country | "name",
        sortOrder as "asc" | "desc"
      );
      setCountries(sortedCountries);
    };

    loadCountries();
  }, [sortOption, sortOrder, filterOptions]);

  const handleSortChange = async (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value);
    setSortOrder("asc");
  };

  return (
    <div className={mergeClasses(styles.sidebarContainer, isActive, styles.open)}>
      <div className={styles.sidebarHeader}>
        <Button icon="menu" onClick={() => setActive(false)} />
        <LogoTitle />
      </div>
      <div className={styles.sidebarSettings}>
        <div className={styles.sortDropdown}>
          <Button
            icon="swap_vert"
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
          onClick={() => setIsModalActive(true)}
        />
      </div>
      <div className={styles.sidebarContent}>
        <table>
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
                    alt={`Flag of ${name.common}`}
                    className={`${styles.countryFlag} img`}
                  />
                </td>
                <td className={styles.countryName}>{name.common}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FilterModal
        isActive={isModalActive}
        setActive={setIsModalActive}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
    </div>
  );
};

export default Sidebar;
