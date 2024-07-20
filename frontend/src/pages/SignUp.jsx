import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SignUp.module.css';
import Triangle from '../assets/triangleImage2.png';
import Ellipse1 from '../assets/ellipseImage1.png';
import Ellipse2 from '../assets/ellipseImage2.png';
import Arrow from '../assets/backArrow.png'

const SignUp = () => {

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  }

  return (
    <div className={styles['wrapper-container']}>
      <img className={styles['arrow-img']} src={Arrow} alt="arrow" />
      <img className={styles['triangle-img']} src={Triangle} alt="triangle" />
      <img className={styles['Ellipse1-img']} src={Ellipse1} alt="Ellipse1" />
      <img className={styles['Ellipse2-img']} src={Ellipse2} alt="Ellipse2" />
      <div className={styles['form-container']}>
        <form className={styles['fields-container']} onSubmit={handleSubmit}>
          <label>Username</label>
          <input type="text" placeholder='Enter your username' name="userName" />
          <label>Email</label>
          <input type="email" placeholder='Enter your email' name="Email" />
          <label>Password</label>
          <input type="password" placeholder='Enter your password' name="Password" />
          <label>Confirm Password</label>
          <input type="password" placeholder='Enter your password' name="ConfirmPassword" />
          <button type='submit'>Log In</button>
          <p>Already have an account? <span onClick={() => navigate('/signin')}>Login</span></p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
