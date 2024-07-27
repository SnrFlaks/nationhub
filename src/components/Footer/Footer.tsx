import { LogoTitle } from "@components/UI";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.logoContainer}>
        <img src="/logo.svg" alt="NationHub Logo" className={styles.logo} />
        <LogoTitle />
      </div>
      <div className={styles.sectionContainer}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Contact Me</h3>
          <p>
            Email:&nbsp;<a href="mailto:snrflaks4175@gmail.com">snrflaks4175@gmail.com</a>
          </p>
          <p>
            X:&nbsp;
            <a href="https://x.com/flAks322" target="_blank" rel="noopener noreferrer">
              flAks322
            </a>
          </p>
          <p>
            LinkedIn:&nbsp;
            <a
              href="https://www.linkedin.com/in/volodymyr-voloshyn-a14b39264/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Volodymyr Voloshyn
            </a>
          </p>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Data Sources</h3>
          <p>Data is provided by:</p>
          <ul>
            <li>
              <a
                href="https://restcountries.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Rest Countries API
              </a>
            </li>
            <li>
              <a
                href="https://www.worldbank.org/en/home"
                target="_blank"
                rel="noopener noreferrer"
              >
                World Bank
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Terms of Use</h3>
          <p>
            The data provided by The World Bank is subject to the&nbsp;
            <a
              href="https://databank.worldbank.org/source/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Use for Datasets
            </a>
            . Use of this data is governed by a&nbsp;
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Creative Commons Attribution 4.0 International License (CC BY 4.0)
            </a>
            . Please ensure proper attribution when using this data.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
