import axios from "axios";

export interface Country {
  name: {
    common: string;
  };
  flagUrl: string;
  cca2: string;
}

interface FetchCountriesParams {
  independent: boolean;
}

export const fetchCountries = async ({
  independent,
}: FetchCountriesParams): Promise<Country[]> => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/independent?status=${independent}`
    );
    const countries = response.data.map((country: Country) => ({
      ...country,
      flagUrl: `https://catamphetamine.gitlab.io/country-flag-icons/3x2/${country.cca2}.svg`,
    }));
    return countries;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};
