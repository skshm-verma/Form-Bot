import React, { useEffect, useState } from 'react';
import styles from './ResponsePage.module.css';
import NewFormNavbar from '../components/navbars/NewFormNavbar';
import { useForm } from '../context/AllContext';
import { getAllFormData } from '../helpers/api-communicator';
import { useLocation } from 'react-router-dom';

const ResponsePage = () => {
    const location = useLocation();
    const form = useForm();
    const [formId, setFormId] = useState('');
    const [views, setViews] = useState(0);
    const [userInputs, setUserInputs] = useState([]);

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

    const processData = (inputs) => {
        const result = {};

        inputs.forEach(input => {
            const { date, labelName, response } = input;
            if (!result[date]) {
                result[date] = {};
            }
            result[date][labelName] = response;
        });

        return result;
    };

    const generateTableData = (data) => {
        const dates = Object.keys(data);
        if (dates.length === 0) return { headers: [], rows: [] };

        const labels = new Set();
        dates.forEach(date => {
            Object.keys(data[date]).forEach(label => {
                labels.add(label);
            });
        });

        const headers = [
            {
                content: (
                    <>
                        <img width="16px" height="16px" src="https://img.icons8.com/material-outlined/24/FFFFFF/calendar--v1.png" alt="calendar--v1" />
                        <span className={styles.thSpan}>Submitted At</span>
                    </>
                )
            },
            ...Array.from(labels).map(label => ({ content: label }))
        ];

        const rows = dates.map(date => {
            const row = [date];
            headers.slice(1).forEach(header => {
                row.push(data[date][header.content] || '');
            });
            return row;
        });

        return { headers, rows };
    };

    const processedData = processData(userInputs);
    const { headers, rows } = generateTableData(processedData);

    const hasData = rows.length > 0; 
    const starts = userInputs.length; 
    const completionRate = views > 0 ? `${Math.round((starts / views) * 100)}%` : '0%';

    return (
        <div className={styles.responseWrapper}>
            <nav>
                <NewFormNavbar
                    formName={""}
                    setFormName={() => { }}
                    onSave={() => {}}
                    onShare={() => {}}
                    isForm={false}
                    isTheme={false}
                    isResponse={true}
                    isSaved={true}
                />
            </nav>
            {formId ? (
                hasData ? (
                    <>
                        <div className={styles.relevantData}>
                            <div>
                                <span className={styles.name}>Views</span>
                                <span>{views}</span>
                            </div>
                            <div>
                                <span className={styles.name}>Starts</span>
                                <span>{starts}</span>
                            </div>
                            <div>
                                <span className={styles.name}>Completion Rate</span>
                                <span>{completionRate}</span>
                            </div>
                        </div>
                        <div className={styles.wholeData} id="style-1">
                            <div className={styles.tableContainer} id="style-1">
                                <table>
                                    <thead>
                                        <tr>
                                            {headers.map((header, index) => (
                                                <th key={index}>{header.content}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                {row.map((cell, cellIndex) => (
                                                    <td key={cellIndex}>{cell}</td>
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
                )
            ) : (
                <div className={styles.noResponse}>
                    No Response yet collected
                </div>
            )}
        </div>
    );
};

export default ResponsePage;