import mergeClasses from "@utils/mergeClasses";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

interface ModalProps {
  isActive: boolean;
  setActive: (value: boolean) => void;
  title: string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isActive, setActive, title, children }) => {
  return (
    <div
      className={mergeClasses(styles.modalContainer, isActive, styles.active)}
      onClick={() => setActive(false)}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{title}</h3>
          <Button
            icon="close"
            className={styles.closeBtn}
            aria-label="Close filter options"
            onClick={() => setActive(false)}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
