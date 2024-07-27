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
  const [isVisible, setIsVisible] = useState(true);
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
      const countries = await countryService.getCountries();
      setRandomCountry(getRandomCountry(countries));
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
    window.scroll(0, 0);
  };

  const handleRepeatClick = () => {
    setIsVisible(false);
    setTimeout(() => {
      setRandomCountry(getRandomCountry(countries));
      setIsVisible(true);
    }, 150);
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
                    aria-label="Repeat random country"
                    onClick={handleRepeatClick}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div
                    className={mergeClasses(
                      styles.randomCountryContainer,
                      !isVisible,
                      styles.hidden
                    )}
                  >
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
                      {`${randomCountry.extract.substring(0, 250)}...`}
                    </div>
                    <Button
                      icon="open_in_new"
                      className={styles.openBtn}
                      aria-label="Open Country Page"
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
            <div className={styles.tableContainer}>
              <Table className={styles.contentTable}>
                <thead>
                  <tr>
                    <th>
                      <div
                        className={styles.nameContainer}
                        onClick={() => handleSort("name")}
                        aria-label={`Sort by Country name${
                          sortOption === "name"
                            ? sortOrder === "asc"
                              ? " ascending"
                              : " descending"
                            : ""
                        }`}
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
                        aria-label={`Sort by Population${
                          sortOption === "population"
                            ? sortOrder === "asc"
                              ? " ascending"
                              : " descending"
                            : ""
                        }`}
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
                        aria-label={`Sort by GDP${
                          sortOption === "gdp"
                            ? sortOrder === "asc"
                              ? " ascending"
                              : " descending"
                            : ""
                        }`}
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
                        aria-label={`Sort by GDP Per Capita${
                          sortOption === "gdpPCAP"
                            ? sortOrder === "asc"
                              ? " ascending"
                              : " descending"
                            : ""
                        }`}
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
                        aria-label="Open Country Page"
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
                      <td>
                        {gdpPCAP.value !== null ? Math.round(gdpPCAP.value) : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
