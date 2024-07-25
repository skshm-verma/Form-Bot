import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './NewFormNavbar.module.css';
import Close from '../../assets/close.png'


const NewFormNavbar = ({ formName, setFormName, onSave, onShare, isForm, isTheme, isResponse }) => {

  const navigate = useNavigate()

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.formName}>
        {isForm &&
          < input
            type="text"
            placeholder='Enter Form Name'
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        }
      </div>
      <div className={styles.menuWrapper}>
        <div className={styles.menuContainer}>
          <div
            className={isForm ? styles.currentMenu : ''}
            onClick={() => navigate('/workspace/newForm')}>
            Flow
          </div>
          <div
            className={isTheme ? styles.currentMenu : ''}
            onClick={() => navigate('/workspace/selectTheme')}>
            Theme
          </div>
          <div
            className={isResponse ? styles.currentMenu : ''}
            onClick={() => navigate('/workspace/formResponse')}
            >
            Response
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.btn1} onClick={onShare}>Share</button>
        <button className={styles.btn2} onClick={onSave}>Save</button>
        <button className={styles.btn3}><img src={Close} alt="crossIcon" /></button>
      </div>
    </div>
  )
}

export default NewFormNavbar
