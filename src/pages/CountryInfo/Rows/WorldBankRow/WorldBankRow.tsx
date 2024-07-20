import React from "react";
import { Icon } from "@mui/material";
import styles from "./WorldBankRow.module.css";

interface WorldBankRowProps {
  title: string;
  history: { year: number; value: number | null }[];
  formatPrefix?: string;
  formatSuffix?: string;
}

const WorldBankRow: React.FC<WorldBankRowProps> = ({
  title,
  history,
  formatPrefix = "",
  formatSuffix = "",
}) => {
  const findFirstTwoNonNull = (
    history: { year: number; value: number | null }[]
  ): [number | null, number | null] => {
    let firstValue: number | null = null;
    let secondValue: number | null = null;
    for (const entry of history) {
      if (entry.value !== null) {
        if (firstValue === null) {
          firstValue = entry.value;
        } else {
          secondValue = entry.value;
          break;
        }
      }
    }
    return [firstValue, secondValue];
  };

  const [firstValue, secondValue] = findFirstTwoNonNull(history);
  const isShowIcon = firstValue !== null && secondValue !== null;
  const valueRatio = isShowIcon ? firstValue / secondValue! : 1;

  return (
    <tr>
      <th>{title}</th>
      <td>
        <div className={styles.rowInfo}>
          {isShowIcon && (
            <Icon className={valueRatio > 1 ? styles.increaseIcon : styles.decreaseIcon}>
              {valueRatio > 1 ? "arrow_upward" : "arrow_downward"}
            </Icon>
          )}
          {firstValue !== null
            ? `${formatPrefix}${Math.round(firstValue).toLocaleString()}${formatSuffix}`
            : "N/A"}
        </div>
      </td>
    </tr>
  );
};

export default WorldBankRow;
