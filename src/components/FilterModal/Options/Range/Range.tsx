import { Input, RangeSlider } from "@components/UI";
import { Icon } from "@mui/material";
import { useState } from "react";
import mergeClasses from "@utils/mergeClasses";
import styles from "./Range.module.css";

interface RangeProps {
  range: [number, number];
  minMaxRange: [number, number];
  setRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  className?: string;
  label: string;
}

const Range: React.FC<RangeProps> = ({
  range,
  minMaxRange,
  setRange,
  className,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={className}>
      <label className={styles.rangeHeader} onClick={() => setIsOpen(!isOpen)}>
        <span>{label}</span>
        <Icon className={styles.dropdownIcon}>
          {isOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
        </Icon>
      </label>
      <div className={mergeClasses(styles.rangeContent, isOpen, styles.isOpen)}>
        <div className={styles.inputContainer}>
          <Input
            type="string"
            className={styles.input}
            value={range[0]}
            onChange={(e) => setRange([parseInt(e.target.value) || 0, range[1]])}
            min={minMaxRange[0]}
            max={range[1]}
          />
          <span className={styles.separator}>-</span>
          <Input
            type="string"
            className={styles.input}
            value={range[1]}
            onChange={(e) => setRange([range[0], parseInt(e.target.value) || 0])}
            min={range[0]}
            max={minMaxRange[1]}
          />
        </div>
        <RangeSlider
          className={`${styles.slider}`}
          range={range}
          setRange={setRange}
          minMaxRange={minMaxRange}
        />
      </div>
    </div>
  );
};

export default Range;
