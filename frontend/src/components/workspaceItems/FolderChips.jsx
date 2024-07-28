import React from 'react'
import Delete from '../../assets/delete.png';
import styles from './FolderChips.module.css';

const FolderChips = ({ folderName, id, onClick, onDelete, className }) => {
  return (
    <div className={`${styles.folder} ${className}`} onClick={() => onClick(id)}>
      <span>{folderName}</span>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevents the folder click event
          onDelete(id);
        }}>
        <img width="20px" height="20px" src={Delete} alt="deleteIcon" />
      </button>
    </div>
  )
}

export default FolderChips