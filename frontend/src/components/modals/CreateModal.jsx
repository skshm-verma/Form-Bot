import React from 'react'
import styles from './CreateModal.module.css'

const CreateModal = ({ option1, option2, requiredField, setInputName, inputName, setOpenModal }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Create {requiredField}</h2>
                <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder={`Enter ${requiredField} Name`}
                />
                <div className={styles.buttonContainer}>
                    <button className={styles.button1} onClick={() => setOpenModal(false)}>{option1}</button>
                    <button className={styles.button2} onClick={() => setOpenModal(false)}>{option2}</button>
                </div>
            </div>
        </div>
    )
}

export default CreateModal
