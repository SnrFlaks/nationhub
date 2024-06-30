import { useState } from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import "./styles/App.css";
import "./styles/Mui.css";
import { StyledEngineProvider } from "@mui/material";

function App() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  return (
    <StyledEngineProvider injectFirst>
      <Header setSidebarActive={setIsSidebarActive} />
      <Sidebar isActive={isSidebarActive} setActive={setIsSidebarActive} />
    </StyledEngineProvider>
  );
}

export default App;
