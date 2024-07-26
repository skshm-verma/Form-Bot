import React from 'react'
import styles from './FormChips.module.css'
import Delete from '../../assets/delete.png';

const FormChips = ({ formName, onClick }) => {
  return (
    <div className={styles.formChip} onClick={() => onClick(formName)}>
      <span>
        {formName}
      </span>
      <img src={Delete} alt="deleteIcon" />
    </div>
  );
};

export default FormChips
