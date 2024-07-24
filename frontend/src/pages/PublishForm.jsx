import React, { useState, useEffect } from 'react';
import styles from './PublishForm.module.css';

const formData = {
    fields: [
        // { type: "text", content: "", public: true },
        { type: "text", content: "Enter Your Name", public: false },
        { type: "text", content: "", public: true },
        { type: "email", content: "Enter Your Email", public: false },
        { type: "text", content: "", public: true },
        { type: "text", content: "Enter your Phone number", public: false },
        { type: "text", content: "", public: true },
        { type: "text", content: "Enter Ratings", public: false },
        { type: "text", content: "", public: true },
        { type: "date", content: "Enter Date of Birth", public: false },
        { type: "email", content: "", public: true }
    ]
};

const PublishForm = () => {
    const [userInput, setUserInput] = useState('');
    const [submittedValues, setSubmittedValues] = useState([formData.fields[0].public ? '' : formData.fields[0]]);
    const [currentFieldIndex, setCurrentFieldIndex] = useState(formData.fields[0].public ? 0 : 1);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!isPaused && currentFieldIndex < formData.fields.length) {
            const currentField = formData.fields[currentFieldIndex];
            if (!currentField.public) {

                setTimeout(() => {
                    setCurrentFieldIndex(currentFieldIndex + 1);
                }, 2000);
                setSubmittedValues(prevValues => [...prevValues, { content: currentField.content, type: currentField.type, public: currentField.public }]);
                console.log(submittedValues);
            } else {
                setIsPaused(true);
            }
        }
    }, [currentFieldIndex, isPaused]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedValues(prevValues => [...prevValues, { content: userInput, type: formData.fields[currentFieldIndex].type, public: formData.fields[currentFieldIndex].public }]);
        setUserInput('');
        setIsPaused(false);
        setCurrentFieldIndex(currentFieldIndex + 1);
    };

    return (
        <div className={styles.submitFormWrapper}>
            <div className={styles.formData}>
                {submittedValues.map((value, index) => (
                    <div className={value.public ? styles.publicValues : styles.systemValues} key={index}>{value.content}</div>
                ))}
            </div>
            {currentFieldIndex < formData.fields.length && formData.fields[currentFieldIndex].public && (
                <form onSubmit={handleSubmit} className={styles.publishFormContainer}>
                    <div className={styles.inputDetail}>
                        <label>
                            {formData.fields[currentFieldIndex].content || 'Hi'}
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

{/* {submittedValues.map((value, index) => (
                    <div key={index}>{value.content}</div>
                ))}
            </div>
            {currentFieldIndex < formData.fields.length && formData.fields[currentFieldIndex].public && (
                <form onSubmit={handleSubmit}>
                    <label>
                        {formData.fields[currentFieldIndex].content || 'Enter value:'}
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            )} */}


// import React, { useState, useEffect } from 'react';
// import styles from './PublishForm.module.css';

// const formData = {
//     fields: [
//         { type: "text", content: "Enter Your Name", public: false },
//         { type: "text", content: "", public: true },
//         { type: "email", content: "Enter Your Email", public: false },
//         { type: "text", content: "", public: true },
//         { type: "text", content: "Enter your Phone number", public: false },
//         { type: "text", content: "", public: true },
//         { type: "text", content: "Enter Ratings", public: false },
//         { type: "text", content: "", public: true },
//         { type: "date", content: "Enter Date of Birth", public: false },
//         { type: "email", content: "", public: true }
//     ]
// };

// const PublishForm = () => {
//     const [userInput, setUserInput] = useState('');
//     const [submittedValues, setSubmittedValues] = useState([]);
//     const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
//     const [isPaused, setIsPaused] = useState(false);

//     const processNextField = (index) => {
//         if (index >= formData.fields.length) return;

//         const currentField = formData.fields[index];
//         if (currentField.public) {
//             setIsPaused(true);
//         } else {
//             setSubmittedValues(prevValues => [...prevValues, { content: currentField.content, type: currentField.type }]);
//             setTimeout(() => {
//                 setCurrentFieldIndex(index + 1);
//             }, 2000);
//         }
//     };

//     useEffect(() => {
//         if (!isPaused && currentFieldIndex < formData.fields.length) {
//             const currentField = formData.fields[currentFieldIndex];
//             if (!currentField.public) {
//                 setSubmittedValues(prevValues => [...prevValues, { content: currentField.content, type: currentField.type }]);
//                 setTimeout(() => {
//                     setCurrentFieldIndex(currentFieldIndex + 1);
//                 }, 2000);
//             } else {
//                 setIsPaused(true);
//             }
//         }
//     }, [currentFieldIndex, isPaused]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setSubmittedValues(prevValues => [...prevValues, { content: userInput, type: formData.fields[currentFieldIndex].type }]);
//         setUserInput('');
//         setIsPaused(false);
//         setCurrentFieldIndex(currentFieldIndex + 1);
//     };

//     return (
//         <div className={styles.submitFormWrapper}>
//             <div className={styles.formData}>
//                 {submittedValues.map((value, index) => (
//                     <div key={index}>{value.content}</div>
//                 ))}
//             </div>
//             {currentFieldIndex < formData.fields.length && formData.fields[currentFieldIndex].public && (
//                 <form onSubmit={handleSubmit}>
//                     <label>
//                         {formData.fields[currentFieldIndex].content || 'Enter value:'}
//                         <input
//                             type="text"
//                             value={userInput}
//                             onChange={(e) => setUserInput(e.target.value)}
//                             required
//                         />
//                     </label>
//                     <button type="submit">Submit</button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default PublishForm;

