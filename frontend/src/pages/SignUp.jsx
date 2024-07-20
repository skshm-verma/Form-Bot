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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Username validation
    if (!userName) errors.name = "Username required";
    // Email validation
    if (!email) errors.email = "Email is required";
    if (!reg.test(String(email).toLowerCase())) errors.email = "Invalid Email"
    // Password validation
    if (!password) errors.password = "Password is required";
    if (!confirmPassword || password !== confirmPassword) errors.confirmPassword = "Enter same password";

    return errors;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    try {

    } catch (error) {

    }
  }

  return (
    <div className={styles.wrapperContianer}>
      <img className={styles.arrowImg} src={Arrow} alt="arrow" />
      <img className={styles.triangleImg} src={Triangle} alt="triangle" />
      <img className={styles.ellipse1Img} src={Ellipse1} alt="Ellipse1" />
      <img className={styles.ellipse2Img} src={Ellipse2} alt="Ellipse2" />
      <div className={styles.formContainer}>
        <form className={styles.fieldsContainer} onSubmit={handleSubmit}>
          <div className={styles.usernameContainer}>
            <label className={errors.name ? styles.errorLabel : ''}>Username</label>
            <input
              className={errors.name ? styles.errorInput : ''}
              type="text"
              placeholder='Enter your username'
              name="userName"
            />
            {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
          </div>
          <div className={styles.emailContainer}>
            <label className={errors.email ? styles.errorLabel : ''}>Email</label>
            <input
              className={errors.email ? styles.errorInput : ''}
              type="email"
              placeholder='Enter your email'
              name="Email"
            />
            {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
          </div>
          <div className={styles.passwordContainer}>
            <label className={errors.password ? styles.errorLabel : ''}>Password</label>
            <input
              className={errors.password ? styles.errorInput : ''}
              type="password"
              placeholder='Enter your password'
              name="Password"
            />
            {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
          </div>
          <div className={styles.confirmPasswordContainer}>
            <label className={errors.confirmPassword ? styles.errorLabel : ''}>Confirm Password</label>
            <input
              className={errors.confirmPassword ? styles.errorInput : ''}
              type="password"
              placeholder='Enter your password'
              name="ConfirmPassword"
            />
            {errors.confirmPassword && <p className={styles.errorMessage}>{errors.password}</p>}
          </div>
          <button type='submit'>Log In</button>
          <p>Already have an account? <span onClick={() => navigate('/signIn')}>Login</span></p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
