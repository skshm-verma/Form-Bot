import React, { useState } from 'react'
import NewFormNavbar from '../components/navbars/NewFormNavbar';
import styles from './SelectThemePage.module.css';
import Logo from '../assets/logo3.png'

const SelectThemePage = () => {

    const [selectedTheme, setSelectedTheme] = useState('light');
    const handleSave = () => {

    };

    const handleShare = async () => {
        try {
            const response = await createNewTypeBot(auth?.userId, formName, formFields, folderId);
            console.log("Response NewForm:", response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleThemeClick = (theme) => {
        setSelectedTheme(theme);
    };

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
                // className={styles.themeOutputContainer}
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
