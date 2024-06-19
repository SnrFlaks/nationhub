import { Icon, IconButton } from "@mui/material";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import styles from "./Button.module.css";
import "./TouchRipple.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({ children, icon, ...props }) => {
  const btnClass = icon ? styles.iconBtn : styles.defaultBtn;
  return (
    <button className={`${styles.btn} ${btnClass}`} {...props}>
      {icon && (
        <StyledEngineProvider injectFirst>
          <IconButton>
            <Icon className={styles.icon}>{icon}</Icon>
          </IconButton>
        </StyledEngineProvider>
      )}
      {children}
    </button>
  );
};

export default Button;
