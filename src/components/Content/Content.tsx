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
          <h1 className={styles.contentTitle}>{country.name.common}</h1>
          <h2 className={styles.contentDescription}>{country.description}</h2>
          <p className={styles.contentExtract}>{country.extract}</p>
        </>
      )}
    </div>
  );
};

export default Content;
