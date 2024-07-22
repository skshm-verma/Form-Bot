import React from 'react'
import Delete from '../../assets/delete.png';
import styles from './FolderChips.module.css';

const FolderChips = ({ folderName, id, onClick }) => {
  return (
    <div className={styles.folder} key={id} onClick={onClick}>
      <span>{folderName}</span>
      <button>
        <img width="20px" height="20px" src={Delete} alt="deleteIcon" />
      </button>
    </div>
  )
}

export default FolderChips
