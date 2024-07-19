import axios from "axios";

export interface Country {
  name: string;
  description: string;
  extract: string;
  flagSvg: string;
  cca2: string;
  independent: boolean;
  unMember: boolean;
  continents: string[];
  area: number;
  population: WorldBankData;
  gdp: WorldBankData;
  gdpPCAP: WorldBankData;
}

export interface WorldBankData {
  value: number | null;
  history: { year: number; value: number | null }[];
}

export interface FilterOptions {
  independent?: boolean;
  unMember?: boolean;
  area?: { min: number; max: number };
  population?: { min: number; max: number };
  gdp?: { min: number; max: number };
  gdpPCAP?: { min: number; max: number };
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
    const countries = response.data.map(
      (country: { name: { common: string } }) => ({
        ...country,
        name: country.name.common,
      })
    );
    return countries;
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
          specialCases[country.cca2] || country.name
        }`;
        const [wikiData, populationData, gdpData, gdpPCAPData, flagSvg] =
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
          population: populationData,
          gdp: gdpData,
          gdpPCAP: gdpPCAPData,
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
      value:
        data.find((item: { value: number | null }) => item.value !== null)
          ?.value ?? null,
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

  getSortValue = (obj: Country, key: keyof Country) => {
    if (typeof obj[key] === "object" && "value" in obj[key]) {
      return (obj[key as keyof Country] as WorldBankData).value;
    }
    return obj[key];
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
          const countryValue =
            (country[key as keyof Country] as WorldBankData)?.value ??
            country[key as keyof Country];
          const { min, max } = value as { min?: number; max?: number };
          if (typeof countryValue === "number") {
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

  async getCountriesValues<T extends keyof Country>(
    property: T
  ): Promise<number[]> {
    const countries = await this.getCountries();
    return countries
      .map((country) => {
        const value = country[property];
        if (typeof value === "object" && "value" in value) {
          return (value as WorldBankData).value;
        }
        return Number(value);
      })
      .filter((value): value is number => !isNaN(Number(value)));
  }

  async getMin<T extends keyof Country>(
    property: T
  ): Promise<number | undefined> {
    const values = await this.getCountriesValues(property);
    return Math.min(...values);
  }

  async getMax<T extends keyof Country>(
    property: T
  ): Promise<number | undefined> {
    const values = await this.getCountriesValues(property);
    return Math.max(...values);
  }
}

export const countryService = new CountryService();
