import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button, Modal, RangeSlider } from "@components/UI";
import { Country } from "@api/CountryService";
import styles from "./FilterModal.module.css";
import useRange from "@hooks/useRange";
import Input from "@components/UI/Input/Input";

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
        <div className={styles.checkboxContainer}>
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
        </div>
        <div className={styles.sliderContainer}>
          <div className={styles.sliderOption}>
            <span>Population</span>
            <div className={styles.inputContainer}>
              <Input
                type="string"
                className={styles.input}
                value={populationRange[0]}
                onChange={(e) =>
                  setPopulationRange([parseInt(e.target.value) || 0, populationRange[1]])
                }
                min={minMaxPopulationRange[0]}
                max={populationRange[1]}
              />
              <span className={styles.separator}>-</span>
              <Input
                type="string"
                className={styles.input}
                value={populationRange[1]}
                onChange={(e) =>
                  setPopulationRange([populationRange[0], parseInt(e.target.value) || 0])
                }
                min={populationRange[0]}
                max={minMaxPopulationRange[1]}
              />
            </div>
            <RangeSlider
              className={`${styles.sliderOption} ${styles.slider}`}
              range={populationRange}
              setRange={setPopulationRange}
              minMaxRange={minMaxPopulationRange}
            />
          </div>
          <div className={styles.sliderOption}>
            <span>Area</span>
            <div className={styles.inputContainer}>
              <Input
                type="string"
                className={styles.input}
                value={areaRange[0]}
                onChange={(e) =>
                  setAreaRange([parseInt(e.target.value) || 0, areaRange[1]])
                }
                min={minMaxAreaRange[0]}
                max={areaRange[1]}
              />
              <span className={styles.separator}>-</span>
              <Input
                type="string"
                className={styles.input}
                value={areaRange[1]}
                onChange={(e) =>
                  setAreaRange([areaRange[0], parseInt(e.target.value) || 0])
                }
                min={areaRange[0]}
                max={minMaxAreaRange[1]}
              />
            </div>
            <RangeSlider
              className={`${styles.sliderOption} ${styles.slider}`}
              range={areaRange}
              setRange={setAreaRange}
              minMaxRange={minMaxAreaRange}
            />
          </div>
        </div>
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
