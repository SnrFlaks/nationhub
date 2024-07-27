import { useNavigate } from "react-router-dom";
import styles from "./LogoTitle.module.css";

const LogoTitle = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    window.scroll(0, 0);
  };

  return <h1 className={styles.logoTitle} onClick={handleClick} />;
};

export default LogoTitle;
