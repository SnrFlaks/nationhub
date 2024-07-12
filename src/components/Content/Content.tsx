import { useEffect, useState } from "react";
import styles from "./Content.module.css";
import { Country, countryService } from "@api/CountryService";

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
          <p className={styles.countryExtract}>{country.extract}</p>
        </>
      )}
    </div>
  );
};

export default Content;
