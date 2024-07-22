import React from "react";
import styles from "./Table.module.css";

interface TableProps {
  thead?: React.ReactNode;
  tbody: React.ReactNode;
  className?: string;
}

const Table: React.FC<TableProps> = ({ thead, tbody, className }) => {
  return (
    <table className={`${styles.table} ${className ? className : ""}`}>
      {thead && <thead>{thead}</thead>}
      <tbody>{tbody}</tbody>
    </table>
  );
};

export default Table;
