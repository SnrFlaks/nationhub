import axios from "axios";

export interface Country {
  name: {
    common: string;
  };
  description: string;
  extract: string;
  flagSvg: string;
  cca2: string;
  independent: boolean;
  unMember: boolean;
  continents: string[];
  area: { min?: number; max?: number };
  population: number | null;
  populationHistory: { year: number; value: number }[] | null;
  gdp: number | null;
  gdpHistory: { year: number; value: number }[] | null;
  gdpPerCapita: number | null;
  gdpPerCapitaHistory: { year: number; value: number }[] | null;
}

export interface FilterOptions {
  independent?: boolean;
  unMember?: boolean;
  population?: { min: number; max: number };
  gdp?: { min: number; max: number };
  gdpPerCapita?: { min: number; max: number };
}

class CountryService {
  private cacheKey = "countries";
  private fetchPromise: Promise<Country[]> | null = null;

  async getCountries(): Promise<Country[]> {
    const cachedCountries = sessionStorage.getItem(this.cacheKey);
    if (cachedCountries) {
      return JSON.parse(cachedCountries);
    }
    if (this.fetchPromise) {
      return this.fetchPromise;
    }
    this.fetchPromise = this.fetchCountries();
    const countries = await this.fetchPromise;
    sessionStorage.setItem(this.cacheKey, JSON.stringify(countries));
    this.fetchPromise = null;
    return countries;
  }

  private async fetchCountries(): Promise<Country[]> {
    const countries = await this.fetchBasicCountry();
    return this.fetchDetailCountry(countries);
  }

  private async fetchBasicCountry(): Promise<Country[]> {
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,cca2,independent,unMember,continents,area"
    );
    return response.data;
  }

  private async fetchDetailCountry(countries: Country[]): Promise<Country[]> {
    const specialCases: { [key: string]: string } = {
      GE: "Georgia_(country)",
      PS: "State_of_Palestine",
      MF: "Saint_Martin_(island)",
    };
    return await Promise.all(
      countries.map(async (country) => {
        const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${
          specialCases[country.cca2] || country.name.common
        }`;
        const [wikiData, populationData, gdpData, gdpPerCapitaData, flagSvg] =
          await Promise.all([
            axios.get(wikiUrl),
            this.fetchWorldBankData(country.cca2, "SP.POP.TOTL"),
            this.fetchWorldBankData(country.cca2, "NY.GDP.MKTP.CD"),
            this.fetchWorldBankData(country.cca2, "NY.GDP.PCAP.CD"),
            axios.get(
              `https://catamphetamine.gitlab.io/country-flag-icons/3x2/${country.cca2}.svg`
            ),
          ]);
        return {
          ...country,
          description: wikiData.data.description,
          extract: wikiData.data.extract,
          flagSvg: flagSvg.data,
          population: populationData.value,
          populationHistory: populationData.history,
          gdp: gdpData.value,
          gdpHistory: gdpData.history,
          gdpPerCapita: gdpPerCapitaData.value,
          gdpPerCapitaHistory: gdpPerCapitaData.history,
        };
      })
    );
  }

  private fetchWorldBankData = async (
    countryCode: string,
    indicator: string
  ): Promise<{
    value: number | null;
    history: { year: number; value: number }[];
  }> => {
    const response = await axios.get(
      `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?format=json`
    );
    const data = response.data[1] || [];
    return {
      value: data.length > 0 ? data[0].value : null,
      history: data.map(({ date, value }: { date: number; value: number }) => ({
        year: date,
        value: value,
      })),
    };
  };

  async getCountryByCode(code: string): Promise<Country | null> {
    const countries = await this.getCountries();
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
      countries = await this.getCountries();
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

  async getFilteredCountries(options: FilterOptions): Promise<Country[]> {
    const countries = await this.getCountries();
    return countries.filter((country) =>
      Object.entries(options).every(([key, value]) => {
        if (typeof value === "object") {
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
    const countries = await this.getCountries();
    return Math.min(...countries.map((country) => Number(country[property])));
  }

  async getMax<T extends keyof Country>(
    property: T
  ): Promise<number | undefined> {
    const countries = await this.getCountries();
    return Math.max(...countries.map((country) => Number(country[property])));
  }
}

export const countryService = new CountryService();
