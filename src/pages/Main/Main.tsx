import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Main.module.css";
import { Country, countryService } from "@api/CountryService";
import { Button, Table } from "@components/UI";
import { Icon } from "@mui/material";
import mergeClasses from "@utils/mergeClasses";

const Main = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [randomCountry, setRandomCountry] = useState<Country>();
  const [sortOption, setSortOption] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();

  useEffect(() => {
    const loadCountries = async () => {
      const sortedCountries = await countryService.getSortedCountries(
        null,
        sortOption as keyof Country | "name",
        sortOrder as "asc" | "desc"
      );
      setCountries(sortedCountries);
    };

    loadCountries();
  }, [sortOption, sortOrder]);

  useEffect(() => {
    const fetchRandomCountry = async () => {
      const filteredCountries = await countryService.getFilteredCountries({
        independent: true,
        unMember: true,
      });
      setRandomCountry(getRandomCountry(filteredCountries));
    };

    fetchRandomCountry();
  }, []);

  const handleSort = (option: string) => {
    if (sortOption === option) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortOption(option);
      setSortOrder("asc");
    }
  };

  const handleCountryClick = (cca2: string) => {
    navigate(`/${cca2.toLowerCase()}`);
  };

  const handleRepeatClick = () => {
    setRandomCountry(getRandomCountry(countries));
  };

  const getRandomCountry = (countries: Country[]): Country => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>
        Welcome to Nation<span className={styles.hub}>Hub</span>
      </h1>
      <div className={styles.mainContent}>
        {randomCountry && (
          <Table className={styles.randomCountry}>
            <thead>
              <tr>
                <th>
                  Random Country
                  <Button
                    icon="replay"
                    className={styles.repeatBtn}
                    onClick={handleRepeatClick}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={styles.randomCountryContainer}>
                    <div className={styles.randomCountryName}>
                      <img
                        src={`data:image/svg+xml,${encodeURIComponent(
                          randomCountry.flagSvg
                        )}`}
                        alt={`Flag of ${randomCountry.name}`}
                        className={styles.countryFlag}
                      />
                      {randomCountry.name}
                    </div>
                    <div className={styles.randomCountryExtract}>
                      {`${randomCountry.extract.substring(0, 150)}...`}
                    </div>
                    <Button
                      icon="open_in_new"
                      className={styles.openBtn}
                      onClick={() => handleCountryClick(randomCountry.cca2)}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        )}
        {countries.length > 0 && (
          <>
            <h2>Country Statistics</h2>
            <Table className={styles.contentTable}>
              <thead>
                <tr>
                  <th>
                    <div
                      className={styles.nameContainer}
                      onClick={() => handleSort("name")}
                    >
                      Country
                      <Icon
                        className={mergeClasses(
                          styles.arrowIcon,
                          sortOption !== "name",
                          styles.hidden
                        )}
                      >
                        {sortOrder === "asc" ? "arrow_upward" : "arrow_downward"}
                      </Icon>
                    </div>
                  </th>
                  <th>
                    <div
                      className={styles.nameContainer}
                      onClick={() => handleSort("population")}
                    >
                      <Icon>person</Icon>Population
                      <Icon
                        className={mergeClasses(
                          styles.arrowIcon,
                          sortOption !== "population",
                          styles.hidden
                        )}
                      >
                        {sortOrder === "asc" ? "arrow_upward" : "arrow_downward"}
                      </Icon>
                    </div>
                  </th>
                  <th>
                    <div
                      className={styles.nameContainer}
                      onClick={() => handleSort("gdp")}
                    >
                      <Icon>attach_money</Icon>GDP
                      <Icon
                        className={mergeClasses(
                          styles.arrowIcon,
                          sortOption !== "gdp",
                          styles.hidden
                        )}
                      >
                        {sortOrder === "asc" ? "arrow_upward" : "arrow_downward"}
                      </Icon>
                    </div>
                  </th>
                  <th>
                    <div
                      className={styles.nameContainer}
                      onClick={() => handleSort("gdpPCAP")}
                    >
                      <Icon>attach_money</Icon>GDP Per Capita
                      <Icon
                        className={mergeClasses(
                          styles.arrowIcon,
                          sortOption !== "gdpPCAP",
                          styles.hidden
                        )}
                      >
                        {sortOrder === "asc" ? "arrow_upward" : "arrow_downward"}
                      </Icon>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {countries.map(({ cca2, name, flagSvg, population, gdp, gdpPCAP }) => (
                  <tr key={cca2}>
                    <td
                      className={styles.countryName}
                      onClick={() => handleCountryClick(cca2)}
                    >
                      <img
                        src={`data:image/svg+xml,${encodeURIComponent(flagSvg)}`}
                        alt={`Flag of ${name}`}
                        className={styles.countryFlag}
                      />
                      {name}
                    </td>
                    <td>
                      {population.value !== null ? Math.round(population.value) : "N/A"}
                    </td>
                    <td>{gdp.value !== null ? Math.round(gdp.value) : "N/A"}</td>
                    <td>{gdpPCAP.value !== null ? Math.round(gdpPCAP.value) : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
