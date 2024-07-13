import { useEffect, useState } from "react";
import styles from "./Content.module.css";
import { Country, countryService } from "@api/CountryService";
import { Helmet } from "react-helmet-async";

interface ContentProps {
  selectedCountry: string;
}

const Content = ({ selectedCountry }: ContentProps) => {
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      const fetchedCountry = await countryService.getCountryByCode(selectedCountry);
      setCountry(fetchedCountry);
    };

    fetchCountryData();
  }, [selectedCountry]);

  const findFirstNonNAValue = (history: { year: number; value: number }[]) => {
    if (history) {
      for (const entry of history) {
        if (entry.value !== null) {
          return Math.round(entry.value);
        }
      }
    }
    return null;
  };

  return (
    <>
      {country && (
        <Helmet>
          <title>{country.name.common}</title>
          <meta name="description" content={country.extract} />
        </Helmet>
      )}
      <div className={styles.contentContainer}>
        {country && (
          <>
            <div className={styles.countryHeader}>
              <img
                src={`data:image/svg+xml,${encodeURIComponent(country.flagSvg)}`}
                alt={`Flag of ${country.name.common}`}
                className={`${styles.countryFlag} img`}
              />
              <h1 className={styles.countryName}>{country.name.common}</h1>
            </div>
            <h2 className={styles.countryDescription}>{country.description}</h2>
            <div className={styles.countryInfoContainer}>
              <p className={styles.countryExtract}>{country.extract}</p>
              <table className={styles.countryDetailsTable}>
                <tbody>
                  <tr>
                    <th>Independent</th>
                    <td>{country.independent ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <th>UN Member</th>
                    <td>{country.unMember ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <th>Continents</th>
                    <td>{country.continents.join(", ")}</td>
                  </tr>
                  <tr>
                    <th>Area</th>
                    <td>{country.area.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <th>Population</th>
                    <td>
                      {country.population ? country.population.toLocaleString() : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <th>GDP</th>
                    <td>
                      {country.gdp
                        ? `$${Math.round(country.gdp).toLocaleString()}`
                        : country.gdpHistory
                        ? findFirstNonNAValue(country.gdpHistory) !== null
                          ? `$${findFirstNonNAValue(
                              country.gdpHistory
                            )?.toLocaleString()}`
                          : "N/A"
                        : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <th>GDP per Capita</th>
                    <td>
                      {country.gdpPerCapita
                        ? `$${Math.round(country.gdpPerCapita).toLocaleString()}`
                        : country.gdpPerCapitaHistory
                        ? findFirstNonNAValue(country.gdpPerCapitaHistory) !== null
                          ? `$${findFirstNonNAValue(
                              country.gdpPerCapitaHistory
                            )?.toLocaleString()}`
                          : "N/A"
                        : "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Content;
