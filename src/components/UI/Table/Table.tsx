import React from "react";
import styles from "./Table.module.css";

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

const Table: React.FC<TableProps> = ({ className, children }) => {
  return (
    <table className={`${styles.table} ${className ? className : ""}`}>{children}</table>
  );
};

export default Table;
