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
  area: { min?: number; max?: number };
  population: { min?: number; max?: number };
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
        } else if (typeof value === "object") {
          const countryValue = country[key as keyof Country];
          if (typeof countryValue === "number") {
            const { min, max } = value as { min?: number; max?: number };
            return (
              (min === undefined || countryValue >= min) &&
              (max === undefined || countryValue <= max)
            );
          }
          return false;
        } else {
          return String(country[key as keyof Country]) === String(value);
        }
      })
    );
  }

  async getMin<T extends keyof Country>(
    property: T
  ): Promise<number | undefined> {
    const countries = await this.getAllCountries();
    return Math.min(...countries.map((country) => Number(country[property])));
  }

  async getMax<T extends keyof Country>(
    property: T
  ): Promise<number | undefined> {
    const countries = await this.getAllCountries();
    return Math.max(...countries.map((country) => Number(country[property])));
  }
}

export const countryService = new CountryService();
