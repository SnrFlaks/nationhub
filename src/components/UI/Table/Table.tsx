import React from "react";
import styles from "./Table.module.css";

interface TableProps {
  thead?: React.ReactNode;
  tbody: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ thead, tbody }) => {
  return (
    <table className={styles.table}>
      {thead && <thead>{thead}</thead>}
      <tbody>{tbody}</tbody>
    </table>
  );
};

export default Table;
