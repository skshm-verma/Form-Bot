import React, { useState } from 'react'
import { signUpUser } from '../helpers/api-communicator';
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast';
import Triangle from '../assets/triangleImage2.png';
import Ellipse1 from '../assets/ellipseImage1.png';
import Ellipse2 from '../assets/ellipseImage2.png';
import Arrow from '../assets/backArrow.png'
import styles from './SignUp.module.css';

const SignUp = () => {

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // this is an independent toaster theme, cannot be written in css file
  const toastTheme = {
    fontSize: "14px",
    fontFamily: 'Poppins',
    width: '100%',
    border: "1px solid #335094",
    padding: "12px 18px",
    borderRadius: "10px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  }

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
    if (!confirmPassword) errors.confirmPassword = "Password is required";
    if (password !== confirmPassword) errors.confirmPassword = "Enter same password";

    return errors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      toast.custom((t) => (
        <div style={toastTheme}>
          <img width="28" height="28" src="https://img.icons8.com/color/48/cancel--v1.png" alt="crossIcon" />
          <p style={{ color: 'red' }}>SignUp Failed</p>
        </div >
      ),
        { id: "login", duration: 800 }
      );
      return;
    }
    try {
      const response = await signUpUser(userName, email, password);
      if (response?.status === 201) {
        toast.custom((t) => (
          <div style={toastTheme}>
            <img width="28" height="28" src="https://img.icons8.com/color/48/ok--v1.png" alt="successIcon" />
            <p style={{ color: 'green' }}>Signed In Successfully</p>
          </div >
        ),
          { id: "login", duration: 800 }
        );
        setTimeout(() => navigate('/'), 500);
      }
    } catch (error) {
      console.log(error);
      toast.custom((t) => (
        <div style={toastTheme}>
          <img width="28" height="28" src="https://img.icons8.com/color/48/cancel--v1.png" alt="crossIcon" />
          <p style={{ color: 'red' }}>SignUp Failed</p>
        </div >
      ),
        { id: "login", duration: 800 }
      );
    }
  }

  return (
    <div className={styles.wrapperContianer1}>
      <Toaster
        position="top-center"
        containerStyle={{ margin: "0px auto", width: "250px", height: "80px", position: "absolute", zIndex: 1, backgroundColor: " #171923"}}
      />
      <img className={styles.arrowImg} src={Arrow} alt="arrow" onClick={() => navigate('/')} />
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
              onChange={(e) => setUserName(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className={styles.errorMessage}>{errors.confirmPassword}</p>}
          </div>
          <button type='submit'>Log In</button>
          <p>Already have an account? <span onClick={() => navigate('/signIn')}>Login</span></p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
