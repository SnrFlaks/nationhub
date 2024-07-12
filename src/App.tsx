import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header, Sidebar, Content } from "./components";
import "./styles/App.css";
import "./styles/Mui.css";

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
    <>
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
    </>
  );
}

export default App;
