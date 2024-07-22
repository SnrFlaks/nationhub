import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Main.module.css";
import { Country, countryService } from "@api/CountryService";
import { Table } from "@components/UI";

interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCountries = async () => {
      const filteredCountries = await countryService.getFilteredCountries({
        independent: true,
        unMember: true,
      });
      const sortedCountries = await countryService.getSortedCountries(
        filteredCountries,
        "name",
        "asc"
      );
      setCountries(sortedCountries);
    };

    loadCountries();
  }, []);

  const handleCountryClick = (cca2: string) => {
    navigate(`/${cca2.toLowerCase()}`);
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>
        Welcome to Nation<span className={styles.hub}>Hub</span>
      </h1>
      <div className={styles.mainContent}>
        <Table
          className={styles.contentTable}
          thead={
            <tr>
              <th>Country</th>
              <th>Population</th>
              <th>GDP</th>
              <th>GDP Per Capita</th>
            </tr>
          }
          tbody={countries.map(({ cca2, name, flagSvg, population, gdp, gdpPCAP }) => (
            <tr key={cca2}>
              <td className={styles.countryName} onClick={() => handleCountryClick(cca2)}>
                <img
                  src={`data:image/svg+xml,${encodeURIComponent(flagSvg)}`}
                  alt={`Flag of ${name}`}
                  className={styles.countryFlag}
                />
                {name}
              </td>
              <td>{population.value !== null ? Math.round(population.value) : "N/A"}</td>
              <td>{gdp.value !== null ? `$${Math.round(gdp.value)}` : "N/A"}</td>
              <td>{gdpPCAP.value !== null ? `$${Math.round(gdpPCAP.value)}` : "N/A"}</td>
            </tr>
          ))}
        />
      </div>
    </div>
  );
};

export default Main;
