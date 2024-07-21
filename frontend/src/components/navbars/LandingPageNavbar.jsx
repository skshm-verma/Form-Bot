import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import styles from './LandingPageNavbar.module.css';


const LandingPageNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.navLinks}>
      <img src={Logo} alt="logo" />
      <div>
        <button className={styles.btn1} onClick={() => navigate("/signin")}>SignIn</button>
        <button className={styles.btn2} onClick={() => navigate("/signup")}>Create a FormBot</button>
      </div>
    </div>
  )
}

export default LandingPageNavbar
