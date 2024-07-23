import React from 'react'
import styles from './NewFormNavbar.module.css';
import Close from '../../assets/close.png'


const NewFormNavbar = () => {
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.formName}>
        <input type="text" placeholder='Enter Form Name' />
      </div>
      <div className={styles.menuWrapper}>
           <div className={styles.menuContainer}>
            <div className={styles.currentMenu}>Flow</div>
            <div>Theme</div>
            <div>Response</div>
           </div>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.btn1}>Share</button>
        <button className={styles.btn2}>Save</button>
        <button className={styles.btn3}><img src={Close} alt="crossIcon" /></button>
      </div>
    </div>
  )
}

export default NewFormNavbar
