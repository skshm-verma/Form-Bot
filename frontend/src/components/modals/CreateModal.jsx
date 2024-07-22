import React, { useState } from 'react'
import styles from './CreateModal.module.css'

const CreateModal = ({ option1, option2, requiredField, setInputName, inputName, setOpenModal }) => {

    const [error, setError] = useState(false);

    const handleDone = () => {
        if (!inputName.trim()) {
            setError(true);
        } else {
            setError(false);
            setOpenModal(false);
        }
    }
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Create {requiredField}</h2>
                <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder={`Enter ${requiredField} Name`}
                    className={error && styles.errorInput}
                />
                {error && <p className={styles.errorMessage}>This field is required.</p>}
                <div className={styles.buttonContainer}>
                    <button className={styles.button1} onClick={handleDone}>{option1}</button>
                    <button className={styles.button2} onClick={() => setOpenModal(false)}>{option2}</button>
                </div>
            </div>
        </div>
    )
}

export default CreateModal
