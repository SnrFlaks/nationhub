import { forwardRef } from "react";
import mergeClasses from "@utils/mergeClasses";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      className={mergeClasses(styles.input, !!className, className || "")}
      ref={ref}
      {...props}
    />
  );
});

export default Input;
