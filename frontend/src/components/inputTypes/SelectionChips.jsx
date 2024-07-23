import React from 'react'
import styles from './SelectionChips.module.css'

const SelectionChips = ({ image, field }) => {
    return (
        <div className={styles.chipsContainer}>
            <img  src={image} alt="Icon" />
            <span>{field}</span>
        </div>
    )
}

export default SelectionChips
