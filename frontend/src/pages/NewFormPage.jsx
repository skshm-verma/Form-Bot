import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AllContext';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './NewFormPage.module.css'
import NewFormNavbar from '../components/navbars/NewFormNavbar'
import SelectionChips from '../components/inputTypes/SelectionChips'
import { createNewTypeBot } from '../helpers/api-communicator';
import Chat from '../assets/chatIcon1.png';
import Gif from '../assets/gifIcon.png';
import Image from '../assets/imageIcon1.png';
import Video from '../assets/videoIcon1.png';
import Text from '../assets/textIcon.png';
import Text1 from '../assets/textIcon1.png';
import Number from '../assets/numberIcon.png';
import Phone from '../assets/phoneIcon.png';
import Rating from '../assets/ratingIcon.png';
import Button from '../assets/buttonIcon.png';
import Date from '../assets/dateIcon.png';
import Email from '../assets/emailIcon.png';
import Flag from '../assets/flagIcon.png'
import InputChips from '../components/inputTypes/InputChips';

const predefinedFields = [
  { type: 'text', icon: Chat, label: 'Text', placeholder: 'Click here to edit' },
  { type: 'img', icon: Image, label: 'Image', placeholder: 'Click to add link' },
  { type: 'video', icon: Video, label: 'Video', placeholder: 'Click to add link' },
  { type: 'gif', icon: Gif, label: 'Gif', placeholder: 'Click to add link' }
];

const publicFields = [
  { type: 'text', icon: Text, label: 'Text', placeholder: 'Hint: User will input a text on his form' },
  { type: 'number', icon: Number, label: 'Number', placeholder: 'Hint: User will input a number on his form' },
  { type: 'email', icon: Email, label: 'Email', placeholder: 'Hint: User will input a email on his form' },
  { type: 'phone', icon: Phone, label: 'Phone', placeholder: 'Hint: User will input a phone on his form' },
  { type: 'date', icon: Date, label: 'Date', placeholder: 'Hint: User will select a date' },
  { type: 'rating', icon: Rating, label: 'Rating', placeholder: 'Hint: User will tap to rate out of 5' },
  { type: 'button', icon: Button, label: 'Button', placeholder: 'Write custom name for start, default: Hi' }
];

const NewFormPage = () => {

  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [folderId] = useState(location.state?.folderId);
  const [formFields, setFormFields] = useState([]);
  const [fieldCounts, setFieldCounts] = useState({});
  const [formName, setFormName] = useState('');



  const addField = (field, isPublic) => {
    const type = field.type;
    const count = fieldCounts[type] || 0;
    const newFieldCounts = { ...fieldCounts, [type]: count + 1 };
    const newField = {
      ...field,
      label: `${field.label} ${count + 1}`,
      public: isPublic,
      content: ''
    };

    setFormFields([...formFields, newField]);
    setFieldCounts(newFieldCounts);
  };

  const updateFieldContent = (index, content) => {
    const newFormFields = formFields.map((field, i) =>
      i === index ? { ...field, content } : field
    );
    setFormFields(newFormFields);
  };

  const deleteField = (index) => {
    const newFormFields = formFields.filter((_, i) => i !== index);
    setFormFields(newFormFields);
  };

  const handleSave = async () => {
    try {
      const response = await createNewTypeBot(auth?.userId, formName, formFields, folderId);
      console.log("Response NewForm:", response);
    } catch (error) {
      console.log(error);
    }
  };

  const renderForm = () => {
    return formFields.map((field, index) =>
    (
      <InputChips
        key={`${field.type}-${index}`}
        field={field.label}
        image={field.icon}
        placeholder={field.placeholder}
        isPublic={field.public}
        onDelete={() => deleteField(index)}
        type={field.type}
        content={field.content}
        onContentChange={(content) => updateFieldContent(index, content)}
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
  }, [auth])


  return (
    <div className={styles.formWrapper}>
      <nav>
        <NewFormNavbar
          formName={formName}
          setFormName={setFormName}
          onSave={handleSave} />
      </nav>
      <div className={styles.formWorkspace}>
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
    </div>
  );
};


export default NewFormPage