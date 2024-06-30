import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button, Modal } from "@components/UI";
import { Country } from "@api/CountryService";
import styles from "./FilterModal.module.css";
import { Slider } from "@mui/material";
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
  const populationMinDistance = minMaxPopulationRange[1] * 0.1;
  const areaMinDistance = minMaxAreaRange[1] * 0.1;

  useEffect(() => {
    setLocalFilterOptions((prevOptions) => ({
      ...prevOptions,
      population: { min: populationRange[0], max: populationRange[1] },
      area: { min: areaRange[0], max: areaRange[1] },
    }));
  }, [populationRange, areaRange]);

  const handleRangeChange = (
    newValue: number | number[],
    activeThumb: number,
    currentRange: number[],
    minDistance: number,
    setRange: React.Dispatch<React.SetStateAction<[number, number]>>
  ) => {
    if (!Array.isArray(newValue)) return;
    const [prevMin, prevMax] = currentRange;
    const [newMin, newMax] = newValue;
    const min = activeThumb === 0 ? newMin : prevMin;
    const max = activeThumb === 0 ? prevMax : newMax;
    setRange([
      Math.min(min, prevMax - minDistance),
      Math.max(max, prevMin + minDistance),
    ]);
  };

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
          <Slider
            className={`${styles.sliderOption} ${styles.slider}`}
            value={populationRange}
            step={minMaxPopulationRange[1] * 0.01}
            onChange={(_, newValue, activeThumb) => {
              handleRangeChange(
                newValue,
                activeThumb,
                populationRange,
                populationMinDistance,
                setPopulationRange
              );
            }}
            valueLabelDisplay="auto"
            min={minMaxPopulationRange[0]}
            max={minMaxPopulationRange[1]}
            disableSwap
          />
        </label>
        <label className={styles.sliderOption}>
          <span>Area</span>
          <Slider
            className={`${styles.sliderOption} ${styles.slider}`}
            value={areaRange}
            step={minMaxAreaRange[1] * 0.01}
            onChange={(_, newValue, activeThumb) => {
              handleRangeChange(
                newValue,
                activeThumb,
                areaRange,
                areaMinDistance,
                setAreaRange
              );
            }}
            valueLabelDisplay="auto"
            min={minMaxAreaRange[0]}
            max={minMaxAreaRange[1]}
            disableSwap
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
