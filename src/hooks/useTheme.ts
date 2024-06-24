import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    (() => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        return storedTheme as "light" | "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    })()
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) =>
      setTheme(e.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return [theme === "dark", toggleTheme] as const;
};

export default useTheme;
