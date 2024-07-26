import { Button, Modal } from "@components/UI";
import styles from "./Settings.module.css";
import { Icon } from "@mui/material";

interface SettingsProps {
  isActive: boolean;
  setActive: (value: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ isActive, setActive }) => {
  const handleClearData = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <Modal isActive={isActive} setActive={setActive} title="Settings">
      <div className={styles.clearDataContainer}>
        <p>
          If you are experiencing issues with loading countries, you can try to clear the
          stored data.
        </p>
        <Button
          className={styles.deleteBtn}
          onClick={handleClearData}
          aria-label="Clear data"
        >
          Clear Data<Icon>delete</Icon>
        </Button>
      </div>
    </Modal>
  );
};

export default Settings;
