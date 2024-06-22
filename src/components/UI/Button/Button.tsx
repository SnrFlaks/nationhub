import { Icon, IconButton } from "@mui/material";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import styles from "./Button.module.css";
import "./TouchRipple.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({ children, icon, ...props }) => {
  return icon ? (
    <StyledEngineProvider injectFirst>
      <IconButton className={props.className} onClick={props.onClick}>
        <Icon className={styles.icon}>{icon}</Icon>
      </IconButton>
    </StyledEngineProvider>
  ) : (
    <button className={`${styles.btn} ${styles.defaultBtn}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
