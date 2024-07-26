import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logoIcon.png';
import styles from './LandingPageNavbar.module.css';


const LandingPageNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.navLinks}>
      <div className={styles.navLogo}>
        <img src={Logo} alt="logo" />
        <span>FormBot</span>
      </div>
      <div>
        <button className={styles.btn1} onClick={() => navigate("/signin")}>SignIn</button>
        <button className={styles.btn2} onClick={() => navigate("/signup")}>Create a FormBot</button>
      </div>
    </div>
  )
}

export default LandingPageNavbar
