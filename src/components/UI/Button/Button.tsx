import { Icon, IconButton } from "@mui/material";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({ children, icon, className, ...props }) => {
  return icon ? (
    <IconButton className={className} onClick={props.onClick}>
      <Icon className={styles.icon}>{icon}</Icon>
    </IconButton>
  ) : (
    <button className={`${styles.btn} ${styles.defaultBtn} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
