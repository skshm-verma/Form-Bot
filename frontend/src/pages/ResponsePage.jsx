import React, { useEffect, useState } from 'react';
import styles from './ResponsePage.module.css';
import NewFormNavbar from '../components/navbars/NewFormNavbar';
import { useForm } from '../context/AllContext';
import { getAllFormData } from '../helpers/api-communicator';
import { useLocation } from 'react-router-dom';

const responseData = [
    {
        Date: "Jul 17, 03:23PM",
        Labels: [
            { name: 'Button 1', response: 'Hi' },
            { name: 'Email', response: 'abc@gmail.com' },
            { name: 'Text 1', response: 'Hi' },
            { name: 'Button 2', response: 'Click Me' },
            { name: 'Rating 1', response: '4' },
            { name: 'Number 1', response: '00000 00000' },
            { name: 'Button 1', response: 'Hi' },
            { name: 'Email', response: 'abc@gmail.com' },
            { name: 'Text 1', response: 'Hi' },
            { name: 'Button 2', response: 'Click Me' },
            { name: 'Rating 1', response: '4' },
            { name: 'Number 1', response: '00000 00000' },
        ],
        Views: '6'
    },
    // {
    //     Date: "Jul 18, 02:15PM",
    //     Labels: [
    //         { name: 'Button 1', response: 'Hello' },
    //         { name: 'Email', response: 'xyz@gmail.com' },
    //         { name: 'Text 1', response: 'Hello' },
    //         { name: 'Button 2', response: 'Press Me' },
    //         { name: 'Rating 1', response: '5' },
    //         { name: 'Number 1', response: '11111 11111' },
    //     ],
    //     Views: '8'
    // },
    // {
    //     Date: "Jul 19, 01:45PM",
    //     Labels: [
    //         { name: 'Button 1', response: 'Hey' },
    //         { name: 'Email', response: 'lmn@gmail.com' },
    //         { name: 'Text 1', response: 'Hey' },
    //         { name: 'Button 2', response: 'Click' },
    //         { name: 'Rating 1', response: '3' },
    //         { name: 'Number 1', response: '22222 22222' },
    //     ],
    //     Views: '10'
    // },
    // {
    //     Date: "Jul 19, 01:45PM",
    //     Labels: [
    //         { name: 'Button 1', response: 'Hey' },
    //         { name: 'Email', response: 'lmn@gmail.com' },
    //         { name: 'Text 1', response: 'Hey' },
    //         { name: 'Button 2', response: 'Click' },
    //         { name: 'Rating 1', response: '3' },
    //         { name: 'Number 1', response: '22222 22222' },
    //     ],
    //     Views: '10'
    // },
    // {
    //     Date: "Jul 19, 01:45PM",
    //     Labels: [
    //         { name: 'Button 1', response: 'Hey' },
    //         { name: 'Email', response: 'lmn@gmail.com' },
    //         { name: 'Text 1', response: 'Hey' },
    //         { name: 'Button 2', response: 'Click' },
    //         { name: 'Rating 1', response: '3' },
    //         { name: 'Number 1', response: '22222 22222' },
    //     ],
    //     Views: '10'
    // },,
    // {
    //     Date: "Jul 19, 01:45PM",
    //     Labels: [
    //         { name: 'Button 1', response: 'Hey' },
    //         { name: 'Email', response: 'lmn@gmail.com' },
    //         { name: 'Text 1', response: 'Hey' },
    //         { name: 'Button 2', response: 'Click' },
    //         { name: 'Rating 1', response: '3' },
    //         { name: 'Number 1', response: '22222 22222' },
    //     ],
    //     Views: '10'
    // },,
    // {
    //     Date: "Jul 19, 01:45PM",
    //     Labels: [
    //         { name: 'Button 1', response: 'Hey' },
    //         { name: 'Email', response: 'lmn@gmail.com' },
    //         { name: 'Text 1', response: 'Hey' },
    //         { name: 'Button 2', response: 'Click' },
    //         { name: 'Rating 1', response: '3' },
    //         { name: 'Number 1', response: '22222 22222' },
    //     ],
    //     Views: '10'
    // },,
    // {
    //     Date: "Jul 19, 01:45PM",
    //     Labels: [
    //         { name: 'Button 1', response: 'Hey' },
    //         { name: 'Email', response: 'lmn@gmail.com' },
    //         { name: 'Text 1', response: 'Hey' },
    //         { name: 'Button 2', response: 'Click' },
    //         { name: 'Rating 1', response: '3' },
    //         { name: 'Number 1', response: '22222 22222' },
    //     ],
    //     Views: '10'
    // },,
    // {
    //     Date: "Jul 19, 01:45PM",
    //     Labels: [
    //         { name: 'Button 1', response: 'Hey' },
    //         { name: 'Email', response: 'lmn@gmail.com' },
    //         { name: 'Text 1', response: 'Hey' },
    //         { name: 'Button 2', response: 'Click' },
    //         { name: 'Rating 1', response: '3' },
    //         { name: 'Number 1', response: '22222 22222' },
    //     ],
    //     Views: '10'
    // },,
    // {
    //     Date: "Jul 19, 01:45PM",
    //     Labels: [
    //         { name: 'Button 1', response: 'Hey' },
    //         { name: 'Email', response: 'lmn@gmail.com' },
    //         { name: 'Text 1', response: 'Hey' },
    //         { name: 'Button 2', response: 'Click' },
    //         { name: 'Rating 1', response: '3' },
    //         { name: 'Number 1', response: '22222 22222' },
    //     ],
    //     Views: '10'
    // },,
    // {
    //     Date: "Jul 19, 01:45PM",
    //     Labels: [
    //         { name: 'Button 1', response: 'Hey' },
    //         { name: 'Email', response: 'lmn@gmail.com' },
    //         { name: 'Text 1', response: 'Hey' },
    //         { name: 'Button 2', response: 'Click' },
    //         { name: 'Rating 1', response: '3' },
    //         { name: 'Number 1', response: '22222 22222' },
    //     ],
    //     Views: '10'
    // },,
    // {
    //     Date: "Jul 19, 01:45PM",
    //     Labels: [
    //         { name: 'Button 1', response: 'Hey' },
    //         { name: 'Email', response: 'lmn@gmail.com' },
    //         { name: 'Text 1', response: 'Hey' },
    //         { name: 'Button 2', response: 'Click' },
    //         { name: 'Rating 1', response: '3' },
    //         { name: 'Number 1', response: '22222 22222' },
    //     ],
    //     Views: '10'
    // },,
    // {
    //     Date: "Jul 19, 01:45PM",
    //     Labels: [
    //         { name: 'Button 1', response: 'Hey' },
    //         { name: 'Email', response: 'lmn@gmail.com' },
    //         { name: 'Text 1', response: 'Hey' },
    //         { name: 'Button 2', response: 'Click' },
    //         { name: 'Rating 1', response: '3' },
    //         { name: 'Number 1', response: '22222 22222' },
    //     ],
    //     Views: '10'
    // },

];

const ResponsePage = () => {
    
    const location = useLocation();
    const form = useForm();
    const [formId, setFormId] = useState('');
    const [views, setViews] = useState(0);
    const [userInputs, setUserInputs] = useState([]);

    const handleSave = () => {
        // Handle save functionality
    };

    const handleShare = () => {
        // Handle share functionality
    };

    const labels = responseData[0].Labels.map(label => label.name);

    useEffect(() => {
        const formIdFromState = location.state?.formId;
        setFormId(formIdFromState || form?.formId);
    }, [location.state, form?.formId]);

    useEffect(() => {
        if (formId) {
            const getResponseData = async () => {
                const response = await getAllFormData(formId);
                setViews(response.views);
                setUserInputs(response.userInputs);
            };
            getResponseData();
        }
    }, [formId]);

    return (
        <div className={styles.responseWrapper}>
            <nav>
                <NewFormNavbar
                    formName={""}
                    setFormName={() => { }}
                    onSave={handleSave}
                    onShare={handleShare}
                    isForm={false}
                    isTheme={false}
                    isResponse={true}
                />
            </nav>
            {formId ? (
                <>
                    <div className={styles.relevantData}>
                        <div>
                            <span className={styles.name}>Views</span>
                            <span>{views}</span>
                        </div>
                        <div>
                            <span className={styles.name}>Starts</span>
                            <span>3</span>
                        </div>
                        <div>
                            <span className={styles.name}>Completion Rate</span>
                            <span>33.33%</span>
                        </div>
                    </div>
                    <div className={styles.wholeData}>
                        <div className={styles.tableContainer}>
                            <table>
                                <thead>
                                    <tr>
                                        <th className={styles.serialNo}></th>
                                        <th  >
                                            <img width="16px" height="16px" src="https://img.icons8.com/material-outlined/24/FFFFFF/calendar--v1.png" alt="calendar--v1" />
                                            <span className={styles.thSpan} >Submitted At</span>
                                        </th>
                                        {labels.map((label, index) => (
                                            <th key={index}>{label}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {responseData.map((data, rowIndex) => (
                                        <tr key={rowIndex}>
                                            <td className={styles.serialNo}>{rowIndex + 1}</td>
                                            <td>{data.Date}</td>
                                            {data.Labels.map((label, index) => (
                                                <td key={index}>{label.response}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <div className={styles.noResponse}>
                    No Response yet collected
                </div>
            )}
        </div>
    );
};

export default ResponsePage;
