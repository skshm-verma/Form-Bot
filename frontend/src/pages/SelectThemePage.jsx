import React, { useState, useEffect } from 'react'
import { useAuth, useForm } from '../context/AllContext';
import NewFormNavbar from '../components/navbars/NewFormNavbar';
import { createNewTypeBot, getAllFormData } from '../helpers/api-communicator';
import styles from './SelectThemePage.module.css';
import Logo from '../assets/logo3.png'
import { useLocation } from 'react-router-dom';

const SelectThemePage = () => {
    // const location = useLocation();
    const auth = useAuth();
    const form = useForm();
    // const [formId, setFormId] = useState('');
    const [selectedTheme, setSelectedTheme] = useState(form?.formTheme);
    const [isSaved, setIsSaved] = useState(false);
//() => localStorage.getItem('selectedTheme') || 
    const handleSave = () => {
        setIsSaved(true);
        // localStorage.setItem('selectedTheme', selectedTheme);
    };

    const handleShare = async () => {
        try {
            if (isSaved && form?.formFields) {
                const response = await createNewTypeBot(auth?.userId, form?.formName, form?.formFields, form?.folderId, form?.formTheme);
                alert(`Form submitted`);
            } else {
                alert('Save The Form First');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleThemeClick = (theme) => {
        setSelectedTheme(theme);
        form?.saveFormTheme(theme);
        // localStorage.setItem('selectedTheme', theme);
    };

    // useEffect(() => {
    //     const formIdFromState = location.state?.formId;
    //     setFormId(formIdFromState || form?.formId);
    // }, [location.state, form?.formId]);

    useEffect(() => {
        if (form?.formId) {
            const getOldTheme = async () => {
                try {

                    const response = await getAllFormData(form?.formId);
                    setSelectedTheme(response?.theme);
                    // localStorage.setItem('selectedTheme', response?.data?.theme);
                } catch (error) {
                    console.log(error)
                }
            }
            getOldTheme()
        }
    }, [form])

    return (
        <div className={styles.themeWrapper}>
            <nav>
                <NewFormNavbar
                    formName={""}
                    setFormName={""}
                    onSave={handleSave}
                    onShare={handleShare}
                    isForm={false}
                    isTheme={true}
                    isResponse={false}
                    isSaved={isSaved}
                />
            </nav>
            <div className={styles.themeContainer}>
                <div className={styles.allThemes}>
                    <h1>Customize the theme</h1>
                    <div className={styles.themeImgs}>
                        <div
                            className={`${styles.lightTheme} ${selectedTheme === 'light' ? styles.selectedTheme : ''}`}
                            onClick={() => handleThemeClick('light')}
                        >
                            <div className={styles.themeBg}>
                                <div className={styles.predefinedItem}>
                                    <img src={Logo} alt="logoIcon" />
                                    <div></div>
                                </div>
                                <div className={styles.publicItem1}>
                                    <span></span>
                                </div>
                                <div className={styles.predefinedItem}>
                                    <img src={Logo} alt="logoIcon" />
                                    <div></div>
                                </div>
                                <div className={styles.publicItem2}>
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                            <div className={styles.themeName}>
                                Light
                            </div>
                        </div>
                        <div
                            className={`${styles.darkTheme} ${selectedTheme === 'dark' ? styles.selectedTheme : ''}`}
                            onClick={() => handleThemeClick('dark')}
                        >
                            <div className={styles.themeBg}>
                                <div className={styles.predefinedItem}>
                                    <img src={Logo} alt="logoIcon" />
                                    <div></div>
                                </div>
                                <div className={styles.publicItem1}>
                                    <span></span>
                                </div>
                                <div className={styles.predefinedItem}>
                                    <img src={Logo} alt="logoIcon" />
                                    <div></div>
                                </div>
                                <div className={styles.publicItem2}>
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                            <div className={styles.themeName}>
                                Dark
                            </div>
                        </div>
                        <div
                            className={`${styles.tailTheme} ${selectedTheme === 'tail' ? styles.selectedTheme : ''}`}
                            onClick={() => handleThemeClick('tail')}
                        >
                            <div className={styles.themeBg}>
                                <div className={styles.predefinedItem}>
                                    <div></div>
                                </div>
                                <div className={styles.publicItem1}>
                                    <span></span>
                                </div>
                                <div className={styles.predefinedItem}>
                                    <div></div>
                                </div>
                            </div>
                            <div className={styles.themeName}>
                                Tail
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`${styles.themeOutputContainer} 
                ${selectedTheme === 'light' ? styles.backgroundColor1 :
                            selectedTheme === 'dark' ? styles.backgroundColor2 : styles.backgroundColor3}`}
                >
                    <div className={styles.field1}>
                        <img src={Logo} alt="logoIcon" />
                        <span>Hello</span>
                    </div>
                    <div className={styles.field2}>
                        <div>Hi</div>
                        <span></span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SelectThemePage
