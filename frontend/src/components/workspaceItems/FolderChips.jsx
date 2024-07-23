import React from 'react'
import Delete from '../../assets/delete.png';
import styles from './FolderChips.module.css';

const FolderChips = ({ folderName, id, onClick, className }) => {
  return (
    <div className={`${styles.folder} ${className}`} onClick={() => onClick(id)}>
      <span>{folderName}</span>
      <button>
        <img width="20px" height="20px" src={Delete} alt="deleteIcon" />
      </button>
    </div>
  )
}

export default FolderChips