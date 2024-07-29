import React, { useState, useEffect } from 'react'
import { useAuth, useForm } from '../context/AllContext';
import NewFormNavbar from '../components/navbars/NewFormNavbar';
import { createNewTypeBot, getAllFormData, updateFormTheme } from '../helpers/api-communicator';
import styles from './SelectThemePage.module.css';
import Logo from '../assets/logo3.png';
import Chat from '../assets/chatIcon1.png';
import Text from '../assets/textIcon.png';
import Email from '../assets/emailIcon.png';
import Tick from '../assets/tick.png';
import Mark from '../assets/mark.png';
// import Success from '../assets/success.png';


const defaultData = [
    {
        content: "Enter Your Name",
        icon: Chat,
        id: "predefined-text",
        label: "Default Text 1",
        placeholder: "Click here to edit",
        public: false,
        type: "text"
    },
    {
        content: "",
        icon: Text,
        id: "public-text",
        label: "Default Text 1",
        placeholder: "Hint: User will input a text on his form",
        public: true,
        type: "text"
    },
    {
        content: "Enter Your Email",
        icon: Chat,
        id: "predefined-text",
        label: "Default Email 1",
        placeholder: "Click here to edit",
        public: false,
        type: "text"
    },
    {
        content: "",
        icon: Email,
        id: "public-text",
        label: "Default Email 1",
        placeholder: "Hint: User will input a email on his form",
        public: true,
        type: "email"
    }
]

const SelectThemePage = () => {
    const auth = useAuth();
    const form = useForm();
    const [selectedTheme, setSelectedTheme] = useState('light');
    const [isSaved, setIsSaved] = useState(false);
    const [successToast, setSuccessToast] = useState(false);
    const [saveFormError, setSaveFormError] = useState(false);


    const handleSave = () => {
        setIsSaved(true);
    };


    const handleShare = async () => {
        try {
            if (isSaved && form?.formId) {
                const response = await updateFormTheme(form?.formId, selectedTheme);
                if (response.status === 200) {
                    setSuccessToast(true);
                    const url = `https://form-bot-mern.vercel.app/submitForm/${form?.formId}`;
                    await navigator.clipboard.writeText(url);
                    setTimeout(() => setSuccessToast(false), 800)
                  }
            } else if (isSaved) {
                const updatedFormFields = [...defaultData, ...form?.formFields];
                const response = await createNewTypeBot(auth?.userId, form?.formName, updatedFormFields, form?.folderId, selectedTheme);
                const newFormId = response?.form?._id;
                if (newFormId) {
                  const url = `https://form-bot-mern.vercel.app/submitForm/${newFormId}`;
                  await navigator.clipboard.writeText(url);
                  setSuccessToast(true);
                  setTimeout(() => setSuccessToast(false), 800)
                }
            } else {
                setSaveFormError(true);
                setTimeout(() => setSaveFormError(false), 800)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleThemeClick = (theme) => {
        setSelectedTheme(theme);
    };

    useEffect(() => {
        if (form?.formId) {
            const getOldTheme = async () => {
                try {

                    const response = await getAllFormData(form?.formId);
                    setSelectedTheme(response?.theme);
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
                {successToast && <div className={styles.toastDiv}>
                    <img src={Tick} alt="tickIcon" />
                    <span>Link Copied</span>
                </div>}
                {saveFormError && <div className={styles.toastDiv}>
                    <img src={Mark} alt="markIcon" />
                    <span>Save Form</span>
                </div>}
                {/* 
                Can be used for other functionality
                {updateToast && <div className={styles.toastDiv}>
                    <img src={Success} alt="successIcon" />
                    <span>Updated Successfully</span>
                </div>} */
                }
            </div>
        </div >
    )
}

export default SelectThemePage
