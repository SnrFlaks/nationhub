import { Checkbox as MuiCheckbox } from "@mui/material";
import { FilterOptions } from "@api/CountryService";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
  filterOptions: FilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
  filterKey: keyof FilterOptions;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  filterOptions,
  setFilterOptions,
  filterKey,
  label,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions({
      ...filterOptions,
      [filterKey]: e.target.checked,
    });
  };

  const handleIgnore = () => {
    delete filterOptions[filterKey];
    setFilterOptions({ ...filterOptions });
  };

  return (
    <div className={styles.checkboxOption}>
      <label className={styles.checkboxLabel}>
        <MuiCheckbox
          checked={
            typeof filterOptions[filterKey] === "boolean"
              ? filterOptions[filterKey]
              : false   
          }
          onChange={handleChange}
          aria-labelledby={`${filterKey}-label`}
        />
        <span id={`${filterKey}-label`}>{label}</span>
      </label>
      <span
        role="button"
        tabIndex={0}
        onClick={handleIgnore}
        aria-label={`Ignore ${label} filter`}
        className={styles.ignoreBtn}
      >
        Ignore
      </span>
    </div>
  );
};

export default Checkbox;
