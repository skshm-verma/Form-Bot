import React, { useState } from 'react';
import styles from './InputChips.module.css';
import Delete from '../../assets/delete.png';

const InputChips = ({ field, image, placeholder, isPublic, onDelete, type, content, onContentChange, error }) => {
    const isDisabled = isPublic && type !== "button";

    return (
        <div className={error? `${styles.inputContainer} ${styles.errorMessage}`: `${styles.inputContainer}`}>
            <span>{isPublic ? `Input ${field}` : field}</span>
            <div className={styles.inputs}>
                <img src={image} alt="imageIcon" />
                <input
                    value={content}
                    onChange={(e) => onContentChange(e.target.value)}
                    disabled={isDisabled}
                    className={isDisabled ? styles.publicInput : styles.defaultInput}
                    type={"text"}
                    placeholder={placeholder}
                />
            </div>
            <span className={styles.deleteImgContainer}>
                <img
                    className={styles.deleteBtn}
                    src={Delete}
                    alt="deleteIcon"
                    onClick={onDelete}
                />
            </span>
            {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
    );
};

export default InputChips;