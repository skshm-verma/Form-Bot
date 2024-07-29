import React from 'react';
import Delete from '../../assets/delete.png';
import Chat from '../../assets/chatIcon1.png';
import Gif from '../../assets/gifIcon.png';
import Image from '../../assets/imageIcon1.png';
import Video from '../../assets/videoIcon1.png';
import Text from '../../assets/textIcon.png';
import Number from '../../assets/numberIcon.png';
import Phone from '../../assets/phoneIcon.png';
import Rating from '../../assets/ratingIcon.png';
import Button from '../../assets/buttonIcon.png';
import Date from '../../assets/dateIcon.png';
import Email from '../../assets/emailIcon.png';
import styles from './InputChips.module.css';

const InputChips = ({ field, image, placeholder, isPublic, onDelete, type, content, onContentChange, error }) => {
    const isDisabled = isPublic && type !== "button";

    const imagePaths = {
        '/src/assets/chatIcon1.png': Chat,
        '/src/assets/gifIcon.png': Gif,
        '/src/assets/imageIcon1.png': Image,
        '/src/assets/videoIcon1.png': Video,
        '/src/assets/textIcon.png': Text,
        '/src/assets/numberIcon.png': Number,
        '/src/assets/phoneIcon.png': Phone,
        '/src/assets/ratingIcon.png': Rating,
        '/src/assets/buttonIcon.png': Button,
        '/src/assets/dateIcon.png': Date,
        '/src/assets/emailIcon.png': Email,
    };

    const imageSrc = imagePaths[image] || image;

    return (
        <div className={error ? `${styles.inputContainer} ${styles.errorMessage}` : `${styles.inputContainer}`}>
            <span>{isPublic ? `Input ${field}` : field}</span>
            <div className={styles.inputs}>
                <img src={imageSrc} alt="imageIcon" />
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