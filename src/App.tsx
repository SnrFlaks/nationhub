import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header, Sidebar, Content } from "./components";
import "./styles/App.css";
import "./styles/Mui.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  useEffect(() => {
    if (countryCode) {
      setSelectedCountry(countryCode.toUpperCase());
    } else {
      setSelectedCountry("");
    }
  }, [countryCode]);

  const handleSetSelectedCountry = (countryCode: string) => {
    setSelectedCountry(countryCode);
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
        selectedCountry={selectedCountry}
        setSelectedCountry={handleSetSelectedCountry}
      />
      <Content selectedCountry={selectedCountry} />
    </HelmetProvider>
  );
}

export default App;
