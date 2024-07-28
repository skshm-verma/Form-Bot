import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WorkspaceNavbar.module.css'

const WorkspaceNavbar = ({ type, name }) => {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.setItem("token", '');
    window.location.reload();
  }

  return (
    <>
      {type === "dropdown" ?
        <div className={styles.dropdown}>
          <button className={styles.dropbtn} onClick={toggleDropdown}>
            <span>{name}</span>
            {isOpen ?
              <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/FFFFFF/expand-arrow--v1.png" alt="expand-arrow--v1" />
              :
              <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/FFFFFF/collapse-arrow.png" alt="collapse-arrow" />
            }
          </button>
          {isOpen && (
            <div className={styles.dropdownContent}>
              <hr />
              <button onClick={() => navigate('/workspace/settings')}>Settings</button>
              <hr />
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div> : <></>}
    </>
  )
}

export default WorkspaceNavbar
