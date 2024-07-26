import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Country, countryService, FilterOptions } from "@api/CountryService";
import { FilterModal, Header, SettingsModal, Sidebar } from "./components";
import "./styles/App.css";
import "./styles/Mui.css";

function App() {
  const navigate = useNavigate();
  const { countryCode } = useParams();
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [isSettingsActive, setIsSettingsActive] = useState<boolean>(false);

  useEffect(() => {
    const loadCountries = async () => {
      const filteredCountries = await countryService.getFilteredCountries(filterOptions);
      setFilteredCountries(filteredCountries);
    };

    loadCountries();
  }, [filterOptions]);

  const handleSelect = (countryCode: string) => {
    navigate(`/${countryCode.toLowerCase()}`);
  };

  return (
    <HelmetProvider>
      <Helmet defaultTitle="NationHub" titleTemplate="%s - NationHub">
        <meta
          name="description"
          content="NationHub is a comprehensive platform providing detailed information about countries and regions."
        />
        <link rel="canonical" href="https://nationhub.netlify.app/" />
      </Helmet>
      <Header
        setSidebarActive={setIsSidebarActive}
        setSettingsActive={setIsSettingsActive}
      />
      <Sidebar
        isActive={isSidebarActive}
        setActive={setIsSidebarActive}
        filteredCountries={filteredCountries}
        selectedCountry={countryCode?.toUpperCase() || ""}
        setSelectedCountry={handleSelect}
        setFilterActive={setIsFilterActive}
      />
      <FilterModal
        isActive={isFilterActive}
        setActive={setIsFilterActive}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
      <SettingsModal isActive={isSettingsActive} setActive={setIsSettingsActive} />
      <Outlet />
    </HelmetProvider>
  );
}

export default App;
