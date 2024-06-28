import axios from "axios";

export interface Country {
  name: {
    common: string;
  };
  flagSvg: string;
  cca2: string;
  independent: boolean;
  unMember: boolean;
  continents: string[];
  region: string;
  subregion: string;
}

class CountryService {
  private cacheKey = "countries";

  async getAllCountries(): Promise<Country[]> {
    const cachedCountries = localStorage.getItem(this.cacheKey);
    if (cachedCountries) {
      return JSON.parse(cachedCountries);
    } else {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countries = await Promise.all(
        response.data.map(async (country: Country) => {
          const flagSvg = await axios.get(
            `https://catamphetamine.gitlab.io/country-flag-icons/3x2/${country.cca2}.svg`
          );
          return {
            ...country,
            flagSvg: flagSvg.data,
          };
        })
      );
      localStorage.setItem(this.cacheKey, JSON.stringify(countries));
      return countries;
    }
  }

  async getCountryByCode(code: string): Promise<Country | null> {
    const countries = await this.getAllCountries();
    return countries.find((country) => country.cca2 === code) || null;
  }

  getSortValue = (country: Country, sortBy: keyof Country): string | number => {
    return sortBy === "name"
      ? country.name.common
      : (country[sortBy] as string | number);
  };

  async getSortedCountries(
    countries: Country[] | undefined,
    sortBy: keyof Country,
    sortOrder: "asc" | "desc" = "asc"
  ): Promise<Country[]> {
    if (!countries) {
      countries = await this.getAllCountries();
    }
    return countries.sort((a, b) => {
      const valueA = this.getSortValue(a, sortBy);
      const valueB = this.getSortValue(b, sortBy);
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

  async getFilteredCountries(options: Partial<Country>): Promise<Country[]> {
    const countries = await this.getAllCountries();
    return countries.filter((country) =>
      Object.entries(options).every(([key, value]) => {
        if (Array.isArray(value)) {
          return value.includes(String(country[key as keyof Country]));
        }
        return String(country[key as keyof Country]) === String(value);
      })
    );
  }
}

export const countryService = new CountryService();
