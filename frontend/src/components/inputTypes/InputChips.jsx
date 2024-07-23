import React from 'react'
import styles from './InputChips.module.css';
import Delete from '../../assets/delete.png'

const InputChips = ({ field, image, placeholder, isPublic }) => {
    return (
        <div className={styles.inputContainer}>
            <span>{field}</span>
            <div className={styles.inputs}>
                <img src={image} alt="imageIcon" />
                <input disabled={isPublic} className={isPublic ? styles.publicInput : styles.defaultInput} type="text" placeholder={placeholder} />
            </div>
            <img className={styles.deleteBtn} src={Delete} alt="deleteIcon" />
        </div>
    )
}

export default InputChips
