import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Header, Sidebar } from "./components";
import "./styles/App.css";
import "./styles/Mui.css";

function App() {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [isSidebarActive, setIsSidebarActive] = useState(false);

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
      </Helmet>
      <Header setSidebarActive={setIsSidebarActive} />
      <Sidebar
        isActive={isSidebarActive}
        setActive={setIsSidebarActive}
        selectedCountry={countryCode?.toUpperCase() || ""}
        setSelectedCountry={handleSelect}
      />
      <Outlet />
    </HelmetProvider>
  );
}

export default App;
