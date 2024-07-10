import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    }
  }, [countryCode]);

  useEffect(() => {
    if (selectedCountry) {
      navigate(`/${selectedCountry.toLowerCase()}`);
    }
  }, [selectedCountry, navigate]);

  return (
    <>
      <Header setSidebarActive={setIsSidebarActive} />
      <Sidebar
        isActive={isSidebarActive}
        setActive={setIsSidebarActive}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <Content selectedCountry={selectedCountry} />
    </>
  );
}

export default App;
