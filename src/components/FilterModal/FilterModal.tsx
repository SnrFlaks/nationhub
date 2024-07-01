import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button, Modal, RangeSlider } from "@components/UI";
import { Country } from "@api/CountryService";
import styles from "./FilterModal.module.css";
import useRange from "@hooks/useRange";

interface FilterModalProps {
  isActive: boolean;
  setActive: (active: boolean) => void;
  filterOptions: Partial<Country>;
  setFilterOptions: (options: Partial<Country>) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isActive,
  setActive,
  filterOptions,
  setFilterOptions,
}) => {
  const [localFilterOptions, setLocalFilterOptions] =
    useState<Partial<Country>>(filterOptions);
  const [populationRange, minMaxPopulationRange, setPopulationRange] =
    useRange("population");
  const [areaRange, minMaxAreaRange, setAreaRange] = useRange("area");

  useEffect(() => {
    setLocalFilterOptions((prevOptions) => ({
      ...prevOptions,
      population: { min: populationRange[0], max: populationRange[1] },
      area: { min: areaRange[0], max: areaRange[1] },
    }));
  }, [populationRange, areaRange]);

  const applyFilters = () => {
    setFilterOptions(localFilterOptions);
    setActive(false);
  };

  return (
    <Modal isActive={isActive} setActive={setActive}>
      <div className={styles.filterHeader}>
        <h3 className={styles.title}>Filter Options</h3>
        <Button
          icon="close"
          className={styles.closeBtn}
          onClick={() => setActive(false)}
        />
      </div>
      <div className={styles.filterContent}>
        <label className={styles.checkboxOption}>
          <Checkbox
            checked={localFilterOptions.independent}
            onChange={(e) => {
              setLocalFilterOptions({
                ...localFilterOptions,
                independent: e.target.checked,
              });
            }}
          />
          <span>Independent</span>
        </label>
        <label className={styles.checkboxOption}>
          <Checkbox
            checked={localFilterOptions.unMember}
            onChange={(e) => {
              setLocalFilterOptions({
                ...localFilterOptions,
                unMember: e.target.checked,
              });
            }}
          />
          <span>UN Member</span>
        </label>
        <label className={styles.sliderOption}>
          <span>Population</span>
          <RangeSlider
            className={`${styles.sliderOption} ${styles.slider}`}
            range={populationRange}
            setRange={setPopulationRange}
            minMaxRange={minMaxPopulationRange}
          />
        </label>
        <label className={styles.sliderOption}>
          <span>Area</span>
          <RangeSlider
            className={`${styles.sliderOption} ${styles.slider}`}
            range={areaRange}
            setRange={setAreaRange}
            minMaxRange={minMaxAreaRange}
          />
        </label>
      </div>
      <div className={styles.filterFooter}>
        <Button className={styles.applyBtn} onClick={applyFilters}>
          Apply
        </Button>
      </div>
    </Modal>
  );
};

export default FilterModal;
