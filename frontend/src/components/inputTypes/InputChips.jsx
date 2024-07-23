import React, { useState } from 'react';
import styles from './InputChips.module.css';
import Delete from '../../assets/delete.png';

const InputChips = ({ field, image, placeholder, isPublic, onDelete, type, content, onContentChange }) => {
    const isDisabled = isPublic && type !== "button";

    return (
        <div className={styles.inputContainer}>
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
            <img
                className={styles.deleteBtn}
                src={Delete}
                alt="deleteIcon"
                onClick={onDelete}
            />
        </div>
    );
};

export default InputChips;


// import React from 'react'
// import styles from './InputChips.module.css';
// import Delete from '../../assets/delete.png'

// const InputChips = ({ field, image, placeholder, isPublic }) => {
//     return (
//         <div className={styles.inputContainer}>
//             <span>{field}</span>
//             <div className={styles.inputs}>
//                 <img src={image} alt="imageIcon" />
//                 <input disabled={isPublic} className={isPublic ? styles.publicInput : styles.defaultInput} type="text" placeholder={placeholder} />
//             </div>
//             <img className={styles.deleteBtn} src={Delete} alt="deleteIcon" />
//         </div>
//     )
// }

// export default InputChips
