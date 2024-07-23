import React, { useState } from 'react'
import styles from './NewFormPage.module.css'
import NewFormNavbar from '../components/navbars/NewFormNavbar'
import SelectionChips from '../components/inputTypes/SelectionChips'
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
  const [formFields, setFormFields] = useState([]);
  const [fieldCounts, setFieldCounts] = useState({});

  const addField = (field, isPublic) => {
    const type = field.type;
    const count = fieldCounts[type] || 0;
    const newFieldCounts = { ...fieldCounts, [type]: count + 1 };
    const newField = {
      ...field,
      label: `${field.label} ${count + 1}`,
      public: isPublic
    };

    setFormFields([...formFields, newField]);
    setFieldCounts(newFieldCounts);
  };

  const deleteField = (index) => {
    const fieldToDelete = formFields[index];
    const newFormFields = formFields.filter((_, i) => i !== index);
    const type = fieldToDelete.type;

    const newFieldCounts = { ...fieldCounts, [type]: fieldCounts[type] - 1 };

    setFormFields(newFormFields);
    setFieldCounts(newFieldCounts);
  };

  const renderForm = () => {
    return formFields.map((field, index) => {
      if (field.public) {
        return (
          <InputChips
            key={index}
            field={field.label}
            image={field.icon}
            placeholder={field.placeholder}
            isPublic={true}
            onDelete={() => deleteField(index)}
            type={field.type}
          />
        );
      } else {
        return (
          <InputChips
            key={index}
            field={field.label}
            image={field.icon}
            placeholder={field.placeholder}
            isPublic={false}
            onDelete={() => deleteField(index)}
            type={field.type}
          />
        );
      }
    });
  };

  return (
    <div className={styles.formWrapper}>
      <nav>
        <NewFormNavbar />
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




// const NewFormPage = () => {
//   return (
//     <div className={styles.formWrapper}>
//       <nav>
//         <NewFormNavbar />
//       </nav>
//       <div className={styles.formWorkspace}>
//         <div className={styles.selectionWrapper}>
//           <div className={styles.bubblesContainer}>
//             <h2>Bubbles</h2>
//             <div className={styles.bubbleItems}>
//               <SelectionChips image={Chat} field={"Text"} />
//               <SelectionChips image={Image} field={"Image"} />
//               <SelectionChips image={Video} field={"Video"} />
//               <SelectionChips image={Gif} field={"Gif"} />
//             </div>
//           </div>
//           <div className={styles.inputsContainer}>
//           <h2>Inputs</h2>
//           <div className={styles.inputItems}>
//             <SelectionChips image={Text} field={"Text"}/>
//             <SelectionChips image={Number} field={"Number"}/>
//             <SelectionChips image={Email} field={"Email"}/>
//             <SelectionChips image={Phone} field={"Phone"}/>
//             <SelectionChips image={Date} field={"Date"}/>
//             <SelectionChips image={Rating} field={"Rating"}/>
//             <SelectionChips image={Button} field={"Buttons"}/>
//           </div>
//           </div>
//         </div>
//         <div className={styles.workWrapper}>
//                <div className={styles.startChip}>
//                    <img width="20px" height="20px" src={Flag} alt="flagIcon" />
//                    <span>Start</span>
//                </div>
//                <InputChips field={"Text 1"} image={Chat} placeholder={"click here to edit"} public={false}/>
//                <InputChips field={"Number 1"} image={Number} placeholder={"Hint : User will input a number on this form"} isPublic={true}/>
//         </div>
//       </div>
//     </div>
//   )
// }