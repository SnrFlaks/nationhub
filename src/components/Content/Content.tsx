import { useEffect, useState } from "react";
import styles from "./Content.module.css";
import { Country, countryService } from "@api/CountryService";
import { Helmet } from "react-helmet-async";
import WorldBankRow from "./Rows/WorldBankRow/WorldBankRow";

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

  return (
    <>
      {country && (
        <Helmet>
          <title>{country.name}</title>
          <meta name="description" content={country.extract} />
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
              <div className={styles.countryDetails}>
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
                    <WorldBankRow
                      title="Population"
                      history={country.population.history}
                    />
                    <WorldBankRow
                      title="GDP"
                      history={country.gdp.history}
                      formatPrefix="$"
                    />
                    <WorldBankRow
                      title="GDP per Capita"
                      history={country.gdpPCAP.history}
                      key="gdpPCAP"
                      formatPrefix="$"
                    />
                  </tbody>
                </table>
              </div>
              <p className={styles.countryExtract}>{country.extract}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Content;
