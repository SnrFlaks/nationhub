import React, { useEffect, useState } from "react";
import { Button, Modal } from "@components/UI";
import { FilterOptions } from "@api/CountryService";
import useRange from "@hooks/useRange";
import { Checkbox } from "@mui/material";
import Range from "./Options/Range/Range";
import styles from "./FilterModal.module.css";

interface FilterModalProps {
  isActive: boolean;
  setActive: (active: boolean) => void;
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isActive,
  setActive,
  filterOptions,
  setFilterOptions,
}) => {
  const [localFilterOptions, setLocalFilterOptions] =
    useState<FilterOptions>(filterOptions);
  const [areaRange, minMaxAreaRange, setAreaRange] = useRange("area");
  const [populationRange, minMaxPopulationRange, setPopulationRange] =
    useRange("population");
  const [gdpRange, minMaxGdpRange, setGdpRange] = useRange("gdp");
  const [gdpPerCapitaRange, minMaxGdpPerCapitaRange, setGdpPerCapitaRange] =
    useRange("gdpPerCapita");

  useEffect(() => {
    setLocalFilterOptions((prevOptions) => ({
      ...prevOptions,
      area: { min: areaRange[0], max: areaRange[1] },
      population: { min: populationRange[0], max: populationRange[1] },
      gdp: { min: gdpRange[0], max: gdpRange[1] },
      gdpPerCapita: { min: gdpPerCapitaRange[0], max: gdpPerCapitaRange[1] },
    }));
  }, [populationRange, areaRange, gdpRange, gdpPerCapitaRange]);

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
        <div className={styles.rangeContainer}>
          <Range
            range={areaRange}
            minMaxRange={minMaxAreaRange}
            setRange={setAreaRange}
            className={styles.rangeOption}
            label="Area"
          />
          <Range
            range={populationRange}
            minMaxRange={minMaxPopulationRange}
            setRange={setPopulationRange}
            className={styles.rangeOption}
            label="Population"
          />
          <Range
            range={gdpRange}
            minMaxRange={minMaxGdpRange}
            setRange={setGdpRange}
            className={styles.rangeOption}
            label="GDP"
          />
          <Range
            range={gdpPerCapitaRange}
            minMaxRange={minMaxGdpPerCapitaRange}
            setRange={setGdpPerCapitaRange}
            className={styles.rangeOption}
            label="GDP per capita"
          />
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
