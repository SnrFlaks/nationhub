import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Country, countryService } from "@api/CountryService";
import { Button, Input } from "@components/UI";
import mergeClasses from "@utils/mergeClasses";
import styles from "./Search.module.css";

interface SearchProps {
  isSearchMode: boolean;
}

const Search: React.FC<SearchProps> = ({ isSearchMode }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<Country[]>([]);
  const [isInputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      const fetchedCountries = await countryService.getCountries();
      setCountries(fetchedCountries);
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredResults([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const startsWithQuery = (text: string) => text.toLowerCase().startsWith(query);
    const results = countries
      .filter(({ name, cca2 }) => {
        return name.toLowerCase().includes(query) || cca2.toLowerCase().includes(query);
      })
      .sort((a, b) => {
        const aStarts = startsWithQuery(a.name) || startsWithQuery(a.cca2);
        const bStarts = startsWithQuery(b.name) || startsWithQuery(b.cca2);
        return aStarts === bStarts ? a.name.localeCompare(b.name) : aStarts ? -1 : 1;
      });
    setFilteredResults(results.slice(0, 7));
  }, [searchQuery, countries]);

  useEffect(() => {
    if (isSearchMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchMode]);

  const handleCountryClick = (cca2: string) => {
    navigate(`/${cca2.toLowerCase()}`);
    inputRef.current?.blur();
  };

  return (
    <>
      <div
        className={styles.inputContainer}
        style={isSearchMode ? { display: "flex" } : undefined}
      >
        <Input
          type="text"
          className={styles.input}
          placeholder="Search..."
          aria-label="Search for a country"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          ref={inputRef}
        />
        <Button
          icon="close"
          className={mergeClasses(
            styles.closeIcon,
            !(searchQuery.length > 0),
            styles.hidden
          )}
          aria-label="Clear search input"
          onClick={() => setSearchQuery("")}
        />
      </div>
      <div
        className={mergeClasses(
          styles.resultsPanel,
          !(filteredResults.length > 0 && isInputFocused),
          styles.hidden
        )}
        onMouseDown={(e) => e.preventDefault()}
      >
        <ul className={styles.resultsList}>
          {filteredResults.map((country) => (
            <li
              key={country.cca2}
              className={styles.resultItem}
              role="option"
              aria-label={`Select ${country.name}`}
              onClick={() => handleCountryClick(country.cca2)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCountryClick(country.cca2);
                }
              }}
            >
              {country.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Search;
