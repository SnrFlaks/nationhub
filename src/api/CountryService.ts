import axios from "axios";

export interface Country {
  name: {
    common: string;
  };
  flagUrl: string;
  cca2: string;
  independent: boolean;
  unMember: boolean;
  continent: string;
  region: string;
  subregion: string;
}

interface FilterOptions {
  independent?: boolean;
  unMember?: boolean;
  continent?: string;
  region?: string;
  subregion?: string;
}

class CountryService {
  private cacheKey = "countries";

  async getAllCountries(): Promise<Country[]> {
    const cachedCountries = localStorage.getItem(this.cacheKey);
    if (cachedCountries) {
      return JSON.parse(cachedCountries);
    } else {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countries = response.data.map((country: Country) => ({
        ...country,
        flagUrl: `https://catamphetamine.gitlab.io/country-flag-icons/3x2/${country.cca2}.svg`,
      }));
      localStorage.setItem(this.cacheKey, JSON.stringify(countries));
      return countries;
    }
  }

  async getCountryByCode(code: string): Promise<Country | null> {
    const countries = await this.getAllCountries();
    return countries.find((country) => country.cca2 === code) || null;
  }

  async getSortedCountries(
    countries: Country[] | undefined,
    sortBy: keyof Country,
    sortOrder: "asc" | "desc" = "asc"
  ): Promise<Country[]> {
    if (!countries) {
      countries = await this.getAllCountries();
    }
    return countries.sort((a, b) => {
      let valueA, valueB;
      if (sortBy === "name") {
        valueA = a.name.common;
        valueB = b.name.common;
      } else {
        valueA = a[sortBy];
        valueB = b[sortBy];
      }
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      } else {
        throw new Error(`Unsupported sortBy parameter or type: ${sortBy}`);
      }
    }); 
  }

  async getFilteredCountries(
    predicate: (country: Country, options: FilterOptions) => boolean,
    options: FilterOptions
  ): Promise<Country[]> {
    const countries = await this.getAllCountries();
    return countries.filter((country) => predicate(country, options));
  }
}

export const countryService = new CountryService();
