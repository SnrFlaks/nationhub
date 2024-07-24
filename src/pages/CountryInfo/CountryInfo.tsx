import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Country, countryService } from "@api/CountryService";
import { Table } from "@components/UI";
import WorldBankRow from "./Rows/WorldBankRow/WorldBankRow";
import styles from "./CountryInfo.module.css";
import { useParams } from "react-router-dom";

const CountryInfo = () => {
  const [country, setCountry] = useState<Country | null>(null);
  const { countryCode } = useParams();

  useEffect(() => {
    const fetchCountryData = async () => {
      const fetchedCountry = await countryService.getCountryByCode(
        countryCode?.toUpperCase() || ""
      );
      setCountry(fetchedCountry);
    };

    fetchCountryData();
  }, [countryCode]);

  return (
    <>
      {country && (
        <Helmet>
          <title>{country.name}</title>
          <meta name="description" content={country.extract} />
          <link
            rel="canonical"
            href={`https://nationhub.netlify.app/${country.cca2.toLowerCase()}`}
          />
        </Helmet>
      )}
      <div className={styles.contentContainer}>
        {country && (
          <>
            <div className={styles.countryHeader}>
              <img
                src={`data:image/svg+xml,${encodeURIComponent(country.flagSvg)}`}
                alt={`Flag of ${country.name}`}
                className={`${styles.countryFlag} img`}
              />
              <h1 className={styles.countryName}>{country.name}</h1>
            </div>
            <h2 className={styles.countryDescription}>{country.description}</h2>
            <div className={styles.countryInfoContainer}>
              <Table className={styles.countryInfoTable}>
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
                  <WorldBankRow title="Population" history={country.population.history} />
                  <WorldBankRow
                    title="GDP"
                    history={country.gdp.history}
                    formatPrefix="$"
                  />
                  <WorldBankRow
                    title="GDP per Capita"
                    history={country.gdpPCAP.history}
                    formatPrefix="$"
                  />
                </tbody>
              </Table>
              <p className={styles.countryExtract}>{country.extract}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CountryInfo;
