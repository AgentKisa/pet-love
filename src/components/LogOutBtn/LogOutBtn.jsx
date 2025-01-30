import { useState } from "react";
import ModalApproveAction from "./ModalApproveAction";
import styles from "./LogOutBtn.module.css";

const LogOutBtn = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleLogout = () => {
    setModalOpen(true);
  };

  return (
    <>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Log Out
      </button>
      {isModalOpen && (
        <ModalApproveAction onClose={() => setModalOpen(false)} />
      )}
    </>
  );
};

export default LogOutBtn;
