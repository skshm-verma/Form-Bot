import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllFormData, createUserInput, updateFormViews } from '../helpers/api-communicator';
import { useForm } from '../context/AllContext';
import styles from './PublishForm.module.css';
import Logo from '../assets/logo3.png';
import Send from '../assets/send.png';

const PublishForm = () => {
    const { formId } = useParams();
    const form = useForm();
    const [formData, setFormData] = useState(null);
    const [userInput, setUserInput] = useState('');
    const [submittedValues, setSubmittedValues] = useState([]);
    const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [selectedRating, setSelectedRating] = useState(null);

    useEffect(() => {
        const date = new Date();
        const options = {
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        };
        setCurrentDateTime(date.toLocaleDateString('en-US', options));
    }, []);

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const data = await getAllFormData(formId);
                setFormData(data);
                console.log("Current Data: ", data);
                if (data.fields.length > 0) {
                    const initialField = data.fields[0];
                    setSubmittedValues(initialField.public ? [] : [initialField]);

                    setCurrentFieldIndex(initialField.public ? 0 : 1);
                }

                const newViews = data.views + 1;
                await updateFormViews(formId, newViews);
            } catch (error) {
                console.error("Failed to fetch form data", error);
            }
        };
        fetchFormData();
    }, [formId]);

    useEffect(() => {
        if (!isPaused && currentFieldIndex < formData?.fields.length) {
            const currentField = formData.fields[currentFieldIndex];
            if (!currentField.public) {
                setTimeout(() => {
                    setCurrentFieldIndex(currentFieldIndex + 1);
                }, 2000);
                setSubmittedValues(prevValues => [...prevValues, { content: currentField.content, type: currentField.type, public: currentField.public }]);
                console.log("Submitted values: ", submittedValues);
            } else {
                setIsPaused(true);
            }
        }
    }, [currentFieldIndex, isPaused, formData]);


    const getBackgroundColorClass = (theme) => {
        switch (theme) {
            case 'dark':
                return styles.darkTheme;
            case 'tail':
                return styles.tailTheme;
            case 'light':
                return styles.lightTheme;
            default:
                return styles.lightTheme;
        }
    };

    const handleDateChange = (e) => {
        const [year, month, day] = e.target.value.split('-');
        setUserInput(`${day}/${month}/${year}`);
    };

    const handleRatingClick = (rating) => {
        setSelectedRating(rating);
        setUserInput(rating);
    };

    const handleSubmit = async (e) => {
        console.log(formData?.fields[currentFieldIndex].label);
        e.preventDefault();
        try {
            await createUserInput(
                formId,
                currentDateTime,
                formData?.fields[currentFieldIndex].label,
                userInput
            );
        } catch (error) {
            console.error("Failed to submit user input", error);
        }

        setSubmittedValues(prevValues => [
            ...prevValues,
            { content: userInput, type: formData.fields[currentFieldIndex].type, public: formData.fields[currentFieldIndex].public }
        ]);
        setUserInput('');
        setIsPaused(false);
        setCurrentFieldIndex(currentFieldIndex + 1);
    };

    return (
        <div className={`${styles.submitFormWrapper} ${formData ? getBackgroundColorClass(formData.theme) : ''}`}>
            <div className={styles.formData}>
                {submittedValues.map((value, index) => (
                    value?.public ? (value?.type === 'rating' ?
                        <div className={styles.publicValues} key={index}>
                            <div className={styles.ratingDisplay}>
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <div
                                        key={rating}
                                        className={`${selectedRating === rating ? styles.selectedRating : ''}`}
                                    >
                                        {rating}
                                    </div>
                                ))}
                            </div>
                            <span className={styles.ratingSend}><img src={Send} alt="sendIcon" /></span>
                        </div> :
                        (
                            <div className={styles.publicValues} key={index}>
                                <div className={`${value?.type === "button" ? styles.field1Btn : styles.field1}`}>
                                    <div>{value?.content}</div>
                                    {value?.type === 'button' ? <></> : <span><img src={Send} alt="sendIcon" /></span>}
                                </div>
                            </div>
                        )
                    ) : (
                        <div className={styles.systemValues} key={index}>
                            <div className={styles.field2}>
                                <img src={Logo} alt="logoIcon" />
                                {value?.type === 'text' && <span>{value?.content}</span>}
                                {value?.type === 'img' &&
                                    <div className={styles.fieldImgContainer}>
                                        <img src={value?.content} alt="" />
                                    </div>
                                }
                                {value?.type === 'video' &&
                                    <div className={styles.fieldVideoContainer}>
                                        <video key={index} controls>
                                            <source src={value?.content} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                }
                                {value?.type === 'gif' &&
                                    <div className={styles.fieldImgContainer}>
                                        <img src={value?.content} alt="" />
                                    </div>
                                }
                            </div>
                        </div>
                    )
                ))}
            </div>
            {currentFieldIndex < formData?.fields.length && formData?.fields[currentFieldIndex].public && (
                <form onSubmit={handleSubmit} className={styles.publishFormContainer}>
                    <div className={styles.inputDetail}>
                        {formData?.fields[currentFieldIndex].type === 'text' &&
                            <input
                                type="text"
                                value={userInput}
                                placeholder='Enter your text'
                                onChange={(e) => setUserInput(e.target.value)}
                                required
                            />
                        }
                        {formData?.fields[currentFieldIndex].type === 'date' &&
                            <input
                                type="date"
                                onChange={handleDateChange}
                                required
                                className={styles.dateInput}
                            />}
                        {formData?.fields[currentFieldIndex].type === 'email' &&
                            <input
                                type="text"
                                value={userInput}
                                placeholder='Enter your email'
                                onChange={(e) => setUserInput(e.target.value)}
                                required
                            />}
                        {formData?.fields[currentFieldIndex].type === 'number' &&
                            <input
                                type="text"
                                value={userInput}
                                placeholder='Enter a number'
                                onChange={(e) => setUserInput(e.target.value)}
                                required
                            />}
                        {formData?.fields[currentFieldIndex].type === 'phone' &&
                            <input
                                type="text"
                                value={userInput}
                                placeholder='Enter your phone'
                                onChange={(e) => setUserInput(e.target.value)}
                                required
                            />}
                        {formData?.fields[currentFieldIndex].type === 'button' &&
                            <button
                                className={styles.inputBtn}
                                onClick={() => setUserInput(formData?.fields[currentFieldIndex].content)}
                            >
                                {formData?.fields[currentFieldIndex].content}
                            </button>}
                        {formData?.fields[currentFieldIndex].type === 'rating' &&
                            <div className={styles.ratingInput}>
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <div
                                        key={rating}
                                        className={`${selectedRating === rating ? styles.selectedRating : ''}`}
                                        onClick={() => handleRatingClick(rating)}
                                    >
                                        {rating}
                                    </div>
                                ))}
                            </div>}
                        {formData?.fields[currentFieldIndex].type === 'button' ? <></> :
                            <button type="submit"><img src={Send} alt="sendIcon" /></button>}
                    </div>
                </form>
            )
            }
        </div >
    );
};

export default PublishForm;