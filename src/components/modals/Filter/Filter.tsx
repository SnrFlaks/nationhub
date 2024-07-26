import React, { useEffect, useState } from "react";
import { Button, Modal } from "@components/UI";
import { FilterOptions } from "@api/CountryService";
import useRange from "@hooks/useRange";
import Checkbox from "./Options/Checkbox/Checkbox";
import Range from "./Options/Range/Range";
import styles from "./Filter.module.css";

interface FilterProps {
  isActive: boolean;
  setActive: (active: boolean) => void;
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
}

const Filter: React.FC<FilterProps> = ({
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
  const [gdpPCAPRange, minMaxGdpPCAPRange, setGdpPCAPRange] = useRange("gdpPCAP");

  useEffect(() => {
    setLocalFilterOptions((prevOptions) => ({
      ...prevOptions,
      area: { min: areaRange[0], max: areaRange[1] },
      population: { min: populationRange[0], max: populationRange[1] },
      gdp: { min: gdpRange[0], max: gdpRange[1] },
      gdpPCAP: { min: gdpPCAPRange[0], max: gdpPCAPRange[1] },
    }));
  }, [populationRange, areaRange, gdpRange, gdpPCAPRange]);

  const applyFilters = () => {
    setFilterOptions(localFilterOptions);
    setActive(false);
  };

  return (
    <Modal isActive={isActive} setActive={setActive} title="Filter Options">
      <div className={styles.filterContent}>
        <div className={styles.checkboxContainer}>
          <Checkbox
            filterOptions={localFilterOptions}
            setFilterOptions={setLocalFilterOptions}
            filterKey="independent"
            label="Independent"
          />
          <Checkbox
            filterOptions={localFilterOptions}
            setFilterOptions={setLocalFilterOptions}
            filterKey="unMember"
            label="UN Member"
          />
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
            range={gdpPCAPRange}
            minMaxRange={minMaxGdpPCAPRange}
            setRange={setGdpPCAPRange}
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

export default Filter;
