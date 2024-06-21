import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    (() => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        return storedTheme as "light" | "dark";
      }
      return window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    })()
  );

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return { isDarkMode: theme === "dark", toggleTheme };
};

export default useTheme;
