import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { FilterOptions } from "@api/CountryService";
import { Header, Sidebar } from "./components";
import { Filter, Settings } from "@components/modals";
import "./styles/App.css";
import "./styles/Mui.css";

function App() {
  const navigate = useNavigate();
  const { countryCode } = useParams();
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    independent: true,
    unMember: true,
  });
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [isSettingsActive, setIsSettingsActive] = useState<boolean>(false);

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
        filterOptions={filterOptions}
        selectedCountry={countryCode?.toUpperCase() || ""}
        setSelectedCountry={handleSelect}
        setFilterActive={setIsFilterActive}
      />
      <Filter
        isActive={isFilterActive}
        setActive={setIsFilterActive}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
      <Settings isActive={isSettingsActive} setActive={setIsSettingsActive} />
      <Outlet />
    </HelmetProvider>
  );
}

export default App;
