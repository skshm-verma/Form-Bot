import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllFormFieldData, createUserInput, updateFormViews } from '../helpers/api-communicator';
import { useForm } from '../context/AllContext';
import styles from './PublishForm.module.css';

const PublishForm = () => {
    const { formId } = useParams();
    const form = useForm();
    const [formData, setFormData] = useState(null);
    const [userInput, setUserInput] = useState('');
    const [submittedValues, setSubmittedValues] = useState([]);
    const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState('');

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
                const data = await getAllFormFieldData(formId);
                setFormData(data);
                if (data.fields.length > 0) {
                    const initialField = data.fields[0];
                    setSubmittedValues(initialField.public ? [] : [initialField]);
                    setCurrentFieldIndex(initialField.public ? 0 : 1);
                }

                const newViews = data.views + 1;
                await updateFormViews(formId, newViews);
                form?.setFormViews(newViews);
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
        <div className={styles.submitFormWrapper}>
            <div className={styles.formData}>
                {submittedValues.map((value, index) => (
                    <div className={value?.public ? styles.publicValues : styles.systemValues} key={index}>{value?.content}</div>
                ))}
            </div>
            {currentFieldIndex < formData?.fields.length && formData?.fields[currentFieldIndex].public && (
                <form onSubmit={handleSubmit} className={styles.publishFormContainer}>
                    <div className={styles.inputDetail}>
                        <label>
                            {formData?.fields[currentFieldIndex].content || 'Hi'}
                        </label>
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            required
                        />
                        <button type="submit">Submit</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default PublishForm;