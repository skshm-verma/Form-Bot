import React from 'react'
import styles from './FormChips.module.css'
import Delete from '../../assets/delete.png';

const FormChips = ({formName}) => {
  return (
    <div className={styles.formChip}>
      <span>
        {formName}
      </span>
      <img src={Delete} alt="deleteIcon" />
    </div>
  )
}

export default FormChips
