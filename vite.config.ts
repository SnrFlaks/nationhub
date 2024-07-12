import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import Sitemap from "vite-plugin-sitemap";
import path from "path";
import axios from "axios";

async function fetchCountries(): Promise<string[]> {
  const response = await axios.get(
    "https://restcountries.com/v3.1/all?fields=cca2"
  );
  return response.data.map((country: { cca2: string }) =>
    country.cca2.toLowerCase()
  );
}

export default async () => {
  const countries = await fetchCountries();
  const dynamicRoutes = countries.map((country) => `/${country}`);
  return defineConfig({
    resolve: {
      alias: {
        "@api": path.resolve(__dirname, "src/api"),
        "@components": path.resolve(__dirname, "src/components"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@utils": path.resolve(__dirname, "src/utils"),
      },
    },
    plugins: [
      react(),
      tsconfigPaths(),
      Sitemap({ hostname: "https://nationhub.netlify.app/", dynamicRoutes }),
    ],
  });
};
