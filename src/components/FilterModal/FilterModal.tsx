import React from "react";
import Checkbox from "@mui/material/Checkbox";
import Button from "@components/UI/Button/Button";
import Modal from "@components/UI/Modal/Modal";
import { Country } from "@api/CountryService";
import styles from "./FilterModal.module.css";

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
  return (
    <Modal isActive={isActive} setActive={setActive}>
      <div className={styles.filterContainer}>
        <div className={styles.filterHeader}>
          <h3 className={styles.title}>Filter Options</h3>
          <Button
            icon="close"
            className={styles.closeBtn}
            onClick={() => setActive(false)}
          />
        </div>
        <div className={styles.filterContent}>
          <div className={styles.option}>
            <Checkbox
              checked={filterOptions.independent}
              onChange={(e) => {
                setFilterOptions({ ...filterOptions, independent: e.target.checked });
              }}
            />
            <span>Independent</span>
          </div>
          <div className={styles.option}>
            <Checkbox
              checked={filterOptions.unMember}
              onChange={(e) => {
                setFilterOptions({ ...filterOptions, unMember: e.target.checked });
              }}
            />
            <span>UN Member</span>
          </div>
        </div>
        <div className={styles.filterFooter}></div>
      </div>
    </Modal>
  );
};

export default FilterModal;
