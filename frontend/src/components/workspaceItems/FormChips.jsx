import React from 'react'
import styles from './FormChips.module.css'
import Delete from '../../assets/delete.png';

const FormChips = ({ formName, onClick, onDelete  }) => {
  return (
    <div className={styles.formChip} onClick={() => onClick(formName)}>
      <span>
        {formName}
      </span>
      <img
        src={Delete}
        alt="deleteIcon"
        onClick={(e) => {
          e.stopPropagation(); // Prevents the form click event
          onDelete(formName);
        }} />
    </div>
  );
};

export default FormChips
