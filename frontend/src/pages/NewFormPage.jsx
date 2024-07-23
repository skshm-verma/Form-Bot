import React from 'react'
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

const NewFormPage = () => {
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
              <SelectionChips image={Chat} field={"Text"} />
              <SelectionChips image={Image} field={"Image"} />
              <SelectionChips image={Video} field={"Video"} />
              <SelectionChips image={Gif} field={"Gif"} />
            </div>
          </div>
          <div className={styles.inputsContainer}>
          <h2>Inputs</h2>
          <div className={styles.inputItems}>
            <SelectionChips image={Text} field={"Text"}/>
            <SelectionChips image={Number} field={"Number"}/>
            <SelectionChips image={Email} field={"Email"}/>
            <SelectionChips image={Phone} field={"Phone"}/>
            <SelectionChips image={Date} field={"Date"}/>
            <SelectionChips image={Rating} field={"Rating"}/>
            <SelectionChips image={Button} field={"Buttons"}/>
          </div>
          </div>
        </div>
        <div className={styles.workWrapper}>
               <div className={styles.startChip}>
                   <img width="20px" height="20px" src={Flag} alt="flagIcon" />
                   <span>Start</span>
               </div>
               <InputChips field={"Text 1"} image={Text} placeholder={"click here to edit"} public={false}/>
               <InputChips field={"Image 1"} image={Image} placeholder={"Hint : User will input a text on his form"} isPublic={true}/>
        </div>
      </div>
    </div>
  )
}

export default NewFormPage
