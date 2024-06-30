import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button, Modal } from "@components/UI";
import { Country, countryService } from "@api/CountryService";
import styles from "./FilterModal.module.css";
import { Slider, StyledEngineProvider } from "@mui/material";

interface FilterModalProps {
  isActive: boolean;
  setActive: (active: boolean) => void;
  filterOptions: Partial<Country>;
  setFilterOptions: (options: Partial<Country>) => void;
}

const populationMinDistance = 100000000;
const areaMinDistance = 1000000;

const FilterModal: React.FC<FilterModalProps> = ({
  isActive,
  setActive,
  filterOptions,
  setFilterOptions,
}) => {
  const [localFilterOptions, setLocalFilterOptions] =
    useState<Partial<Country>>(filterOptions);
  const [populationRange, setPopulationRange] = useState<number[]>([0, 0]);
  const [minMaxPopulationRange, setMinMaxPopulationRange] = useState<number[]>([0, 0]);
  const [areaRange, setAreaRange] = useState<number[]>([0, 0]);
  const [minMaxAreaRange, setMinMaxAreaRange] = useState<number[]>([0, 0]);

  useEffect(() => {
    const fetchMinMaxRanges = async () => {
      const minPopulation = await countryService.getMin("population");
      const maxPopulation = await countryService.getMax("population");
      setMinMaxPopulationRange([minPopulation ?? 0, maxPopulation ?? 0]);
      setPopulationRange([minPopulation ?? 0, maxPopulation ?? 0]);
      const minArea = await countryService.getMin("area");
      const maxArea = await countryService.getMax("area");
      setMinMaxAreaRange([minArea ?? 0, maxArea ?? 0]);
      setAreaRange([minArea ?? 0, maxArea ?? 0]);
    };

    fetchMinMaxRanges();
  }, []);

  useEffect(() => {
    setLocalFilterOptions({
      ...localFilterOptions,
      population: { min: populationRange[0], max: populationRange[1] },
    });
  }, [populationRange]);

  useEffect(() => {
    setLocalFilterOptions({
      ...localFilterOptions,
      area: { min: areaRange[0], max: areaRange[1] },
    });
  }, [areaRange]);

  const handlePopulationChange = (
    _event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setPopulationRange((prevRange) => {
      const [prevMin, prevMax] = prevRange;
      const [newMin, newMax] = newValue;
      const min = activeThumb === 0 ? newMin : prevMin;
      const max = activeThumb === 0 ? prevMax : newMax;
      return [
        Math.min(min, prevMax - populationMinDistance),
        Math.max(max, prevMin + populationMinDistance),
      ];
    });
  };

  const handleAreaChange = (
    _event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setAreaRange((prevRange) => {
      const [prevMin, prevMax] = prevRange;
      const [newMin, newMax] = newValue;
      const min = activeThumb === 0 ? newMin : prevMin;
      const max = activeThumb === 0 ? prevMax : newMax;
      return [
        Math.min(min, prevMax - areaMinDistance),
        Math.max(max, prevMin + areaMinDistance),
      ];
    });
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
          <StyledEngineProvider injectFirst>
            <Checkbox
              checked={localFilterOptions.independent}
              onChange={(e) => {
                setLocalFilterOptions({
                  ...localFilterOptions,
                  independent: e.target.checked,
                });
              }}
            />
          </StyledEngineProvider>
          <span>Independent</span>
        </label>
        <label className={styles.checkboxOption}>
          <StyledEngineProvider injectFirst>
            <Checkbox
              checked={localFilterOptions.unMember}
              onChange={(e) => {
                setLocalFilterOptions({
                  ...localFilterOptions,
                  unMember: e.target.checked,
                });
              }}
            />
          </StyledEngineProvider>
          <span>UN Member</span>
        </label>
        <label className={styles.sliderOption}>
          <span>Population</span>
          <StyledEngineProvider injectFirst>
            <Slider
              className={`${styles.sliderOption} ${styles.slider}`}
              value={populationRange}
              step={1000}
              onChange={handlePopulationChange}
              valueLabelDisplay="auto"
              min={minMaxPopulationRange[0]}
              max={minMaxPopulationRange[1]}
              disableSwap
            />{" "}
          </StyledEngineProvider>
        </label>
        <label className={styles.sliderOption}>
          <span>Area</span>
          <StyledEngineProvider injectFirst>
            <Slider
              className={`${styles.sliderOption} ${styles.slider}`}
              value={areaRange}
              step={1000}
              onChange={handleAreaChange}
              valueLabelDisplay="auto"
              min={minMaxAreaRange[0]}
              max={minMaxAreaRange[1]}
              disableSwap
            />{" "}
          </StyledEngineProvider>
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
