import styles from "./Modal.module.css";

interface ModalProps {
  isActive: boolean;
  setActive: (value: boolean) => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isActive, setActive, children }) => {
  return (
    <div
      className={`${styles.modalContainer}${isActive ? ` ${styles.active}` : ""}`}
      onClick={() => setActive(false)}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
