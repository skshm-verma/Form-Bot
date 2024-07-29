import React, { useState, useEffect } from 'react'
import { useAuth, useForm } from '../context/AllContext';
import { useLocation, useNavigate } from 'react-router-dom';
import InputChips from '../components/inputTypes/InputChips';
import NewFormNavbar from '../components/navbars/NewFormNavbar'
import SelectionChips from '../components/inputTypes/SelectionChips'
import { createNewTypeBot, getAllFormData, updateFormData } from '../helpers/api-communicator';
import Chat from '../assets/chatIcon1.png';
import Gif from '../assets/gifIcon.png';
import Image from '../assets/imageIcon1.png';
import Video from '../assets/videoIcon1.png';
import Text from '../assets/textIcon.png';
import Number from '../assets/numberIcon.png';
import Phone from '../assets/phoneIcon.png';
import Rating from '../assets/ratingIcon.png';
import Button from '../assets/buttonIcon.png';
import Date from '../assets/dateIcon.png';
import Email from '../assets/emailIcon.png';
import Flag from '../assets/flagIcon.png'
import Tick from '../assets/tick.png';
import Mark from '../assets/mark.png';
import styles from './NewFormPage.module.css'

const predefinedFields = [
  { id: 'predefined-text', type: 'text', icon: Chat, label: 'Text', placeholder: 'Click here to edit' },
  { id: 'predefined-img', type: 'img', icon: Image, label: 'Image', placeholder: 'Click to add link' },
  { id: 'predefined-video', type: 'video', icon: Video, label: 'Video', placeholder: 'Click to add link' },
  { id: 'predefined-gif', type: 'gif', icon: Gif, label: 'Gif', placeholder: 'Click to add link' }
];

const publicFields = [
  { id: 'public-text', type: 'text', icon: Text, label: 'Text', placeholder: 'Hint: User will input a text on his form' },
  { id: 'public-number', type: 'number', icon: Number, label: 'Number', placeholder: 'Hint: User will input a number on his form' },
  { id: 'public-email', type: 'email', icon: Email, label: 'Email', placeholder: 'Hint: User will input a email on his form' },
  { id: 'public-phone', type: 'phone', icon: Phone, label: 'Phone', placeholder: 'Hint: User will input a phone on his form' },
  { id: 'public-date', type: 'date', icon: Date, label: 'Date', placeholder: 'Hint: User will select a date' },
  { id: 'public-rating', type: 'rating', icon: Rating, label: 'Rating', placeholder: 'Hint: User will tap to rate out of 5' },
  { id: 'public-button', type: 'button', icon: Button, label: 'Button', placeholder: 'Write custom name for start' }
];

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




const NewFormPage = () => {
  const auth = useAuth();
  const form = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [folderId] = useState(location.state?.folderId);
  const [formId] = useState(location.state?.formId);
  const [formFields, setFormFields] = useState([]);
  const [fieldCounts, setFieldCounts] = useState({});
  const [formName, setFormName] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState({});
  const [formNameError, setFormNameError] = useState('');
  const [successToast, setSuccessToast] = useState(false);
  const [saveFormError, setSaveFormError] = useState(false);
  const [duplicateError, setDuplicateError] = useState(false);


  const addField = (field, isPublic) => {
    const icon = field.icon;
    const count = fieldCounts[icon] || 1;
    const newFieldCounts = { ...fieldCounts, [icon]: count + 1 };
    const newField = {
      ...field,
      label: `${field.label} ${count}`,
      public: isPublic,
      content: ''
    };
    setFormFields([...formFields, newField]);
    setFieldCounts(newFieldCounts);
  };

  const updateFieldContent = (index, content) => {
    const newFormFields = formFields.map((field, i) =>
      i === index ? { ...field, content: content ?? '' } : field
    );
    setFormFields(newFormFields);
  };

  const deleteField = (index) => {
    const newFormFields = formFields.filter((_, i) => i !== index);
    setFormFields(newFormFields);
  };

  const validateFields = () => {
    const newErrors = {};
    let isValid = true;
    for (let i = 0; i < formFields.length; i++) {
      const field = formFields[i];
      if (predefinedFields.some(predefined => predefined.id === field.id) && !field.content) {
        newErrors[i] = `Required Field`;
        isValid = false;
      }
    }

    if (!formName.trim()) {
      setFormNameError('Required Field');
      isValid = false;
    } else {
      setFormNameError('');
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateFields()) {
      form.saveFormValues(formName, formFields, folderId);
      setIsSaved(true);
      setFormNameError('');
    }
  };

  const handleShare = async () => {
    try {
      if (validateFields()) {
        if (isSaved && formId) {
          const response = await updateFormData(formId, form?.formFields, form?.formName);
          setFormFields(response.data.fields);
          setFormName(response.data.title);
          setFormNameError('');
          if (response.status === 200) {
            const url = `http://localhost:5173/submitForm/${formId}`;
            await navigator.clipboard.writeText(url);
            setSuccessToast(true);
            setTimeout(() => setSuccessToast(false), 800)
          }
        } else if (isSaved) {
          const updatedFormFields = [...defaultData, ...formFields];    // customizeable
          const response = await createNewTypeBot(auth?.userId, formName, updatedFormFields, folderId, form?.formTheme);
          if (response?.data?.msg === 'Duplicate value entered') {
            setDuplicateError(true);
            setTimeout(() => setDuplicateError(false), 800)
          }
          const newFormId = response?.form?._id;
          if (newFormId) {
            const url = `http://localhost:5173/submitForm/${newFormId}`;
            await navigator.clipboard.writeText(url);
            setSuccessToast(true);
            setTimeout(() => setSuccessToast(false), 800)
          }
        } else {
          setSaveFormError(true);
          setTimeout(() => setSaveFormError(false), 800)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  const renderForm = () => {
    return formFields?.map((field, index) =>
    (
      <InputChips
        key={`${field.type}-${index}`}
        field={field.label}
        image={field?.icon}
        placeholder={field?.placeholder || "Hint: User Will Enter This Value"}
        isPublic={field.public}
        onDelete={() => deleteField(index)}
        type={field.type}
        content={field.content}
        onContentChange={(content) => updateFieldContent(index, content)}
        error={errors[index]}
      />
    ));
  };


  useEffect(() => {

    const checkAuthStatus = async () => {
      const status = await auth?.checkAuthStatus();
      if (status === 401) {
        navigate('/');
      }
    };
    checkAuthStatus();

    const fetchFormDetails = async (formId) => {
      try {
        const response = await getAllFormData(formId);
        setFormName(response.title);
        setFormFields(response.fields);
      } catch (error) {
        console.error(error);
      }
    };

    const formId = location.state?.formId;
    if (formId) {
      form.saveFormId(formId);
      fetchFormDetails(formId);
    }
  }, [auth, location.state, navigate]);


  useEffect(() => {
    if (form?.formFields) {
      setFormFields(form?.formFields);
      setFormName(form?.formName)
    }
  }, [form?.formFields]);


  return (
    <div className={styles.formWrapper} id="style-1">
      <nav>
        <NewFormNavbar
          formName={formName}
          setFormName={setFormName}
          onSave={handleSave}
          onShare={handleShare}
          isForm={true}
          isTheme={false}
          isResponse={false}
          isSaved={isSaved}
          errorMessage={formNameError}
        />
      </nav>
      <div className={styles.formWorkspace} id="style-1">
        <div className={styles.selectionWrapper}>
          <div className={styles.bubblesContainer}>
            <h2>Bubbles</h2>
            <div className={styles.bubbleItems}>
              {predefinedFields.map((field, index) => (
                <SelectionChips
                  key={index}
                  image={field.icon}
                  field={field.label}
                  onClick={() => addField(field, false)}
                />
              ))}
            </div>
          </div>
          <div className={styles.inputsContainer}>
            <h2>Inputs</h2>
            <div className={styles.inputItems}>
              {publicFields.map((field, index) => (
                <SelectionChips
                  key={index}
                  image={field.icon}
                  field={field.label}
                  onClick={() => addField(field, true)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.workWrapper}>
          <div className={styles.startChip}>
            <img width="20px" height="20px" src={Flag} alt="flagIcon" />
            <span>Start</span>
          </div>
          {renderForm()}
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
      {duplicateError && <div className={styles.toastDivDuplicate}>
        <img src={Mark} alt="markIcon" />
        <span>FormName Already Taken</span>
      </div>}
      {/*
      can be used for other purposes 
      {updateToast && <div className={styles.toastDiv}>
        <img src={Success} alt="successIcon" />
        <span>Updated Successfully</span>
      </div>} */}
    </div>
  );
};


export default NewFormPage