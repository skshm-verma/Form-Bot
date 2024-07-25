import React from 'react'
import styles from './ResponsePage.module.css';
import NewFormNavbar from '../components/navbars/NewFormNavbar';

const responseData = {
    Date: "Jul 17, 03:23PM",
    Labels: [
        {
            name: 'Button 1',
            response: 'Hi'
        },
        {
            name: 'Email',
            response: 'abc@gmail.com'
        },
        {
            name: 'Text 1',
            response: 'Hi'
        },
        {
            name: 'Button 2',
            response: 'Click Me'
        },
        {
            name: 'Rating 1',
            response: '4'
        }, {
            name: 'Number 1',
            response: '00000 00000'
        }
    ],
    Views: '6'
}

const ResponsePage = () => {

    const handleSave = () => {

    }

    const handleShare = () => {

    }

    const labels = responseData.Labels.map(label => label.name);
    const responses = responseData.Labels.map(label => label.response);
    return (
        <div className={styles.responseWrapper}>
            <nav>
                <NewFormNavbar
                    formName={""}
                    setFormName={""}
                    onSave={handleSave}
                    onShare={handleShare}
                    isForm={false}
                    isTheme={false}
                    isResponse={true}
                />
            </nav>
            <div className={styles.relevantData}>
                <div>
                    <span className={styles.name}>Views</span>
                    <span>6</span>
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
            <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            {labels.map((label, index) => (
                                <th key={index}>{label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{responseData.Date}</td>
                            {responses.map((response, index) => (
                                <td key={index}>{response}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ResponsePage
