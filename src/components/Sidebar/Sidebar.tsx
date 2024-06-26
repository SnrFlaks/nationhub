import { useEffect, useState } from "react";
import Button from "@components/UI/Button/Button";
import LogoTitle from "@components/UI/LogoTitle/LogoTitle";
import Modal from "@components/UI/Modal/Modal";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  StyledEngineProvider,
} from "@mui/material";
import { Country, countryService } from "@api/CountryService";
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
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  useEffect(() => {
    const loadCountries = async () => {
      const sortedCountries = await countryService.getSortedCountries(
        undefined,
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
    <div className={`${styles.sidebarContainer}${isActive ? ` ${styles.open}` : ""}`}>
      <div className={styles.sidebarHeader}>
        <Button icon="menu" onClick={() => setActive(false)} />
        <LogoTitle />
      </div>
      <div className={styles.sidebarSettings}>
        <div className={styles.sortDropdown}>
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
        <Button
          icon="filter_alt"
          className={styles.filterBtn}
          onClick={() => setIsModalActive(true)}
        />
      </div>
      <div className={styles.sidebarContent}>
        <table>
          <tbody>
            {countries.map(({ cca2, name, flagUrl }) => (
              <tr
                key={cca2}
                className={`${styles.contentItem}${
                  cca2 === selectedCountry ? ` ${styles.selected}` : ""
                }`}
                onClick={() => setSelectedCountry(cca2)}
              >
                <td className={styles.countryFlag}>
                  <img
                    src={flagUrl}
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
      <Modal isActive={isModalActive} setActive={setIsModalActive}></Modal>
    </div>
  );
};

export default Sidebar;
