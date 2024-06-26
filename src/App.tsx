import { useState } from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import "./styles/App.css";
import "./styles/Mui.css";

function App() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  return (
    <>
      <Header setSidebarActive={setIsSidebarActive} />
      <Sidebar isActive={isSidebarActive} setActive={setIsSidebarActive} />
    </>
  );
}

export default App;
