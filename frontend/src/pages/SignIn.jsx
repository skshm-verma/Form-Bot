import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../helpers/api-communicator';
import { Toaster, toast } from 'react-hot-toast';
import Triangle from '../assets/triangleImage2.png';
import Ellipse1 from '../assets/ellipseImage1.png';
import Ellipse2 from '../assets/ellipseImage2.png';
import Arrow from '../assets/backArrow.png';
import Success from '../assets/success.png'
import Error from '../assets/cross.png'
import styles from './SignIn.module.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    backgroundColor: "#171923",
    gap: 8,
  }

  const validate = () => {
    const errors = {};
    // Email validation
    if (!email) errors.email = "Email is required";
    // Password validation
    if (!password) errors.password = "Password is required";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      const notify = () => {
        toast.custom((t) => (
          <div style={toastTheme} >
            <img width="28" height="28" src={Error} alt="crossIcon" />
            <p style={{ color: 'red', backgroundColor: "#171923", }}>Signing In Failed</p>
          </div >
        ),
          { id: "login", duration: 50 }
        );
      }
      notify();
      return;
    }

    try {
      const response = await signInUser(email, password);
      if (response?.msg == 'Invalid Email') {
        errors.email = "Invalid Email";
        setErrors(errors)
        const notify = () => {
          toast.custom((t) => (
            <div style={toastTheme} >
              <img width="28" height="28" src={Error} alt="crossIcon" />
              <p style={{ color: 'red', backgroundColor: "#171923", }}>Signing In Failed</p>
            </div >
          ),
            { id: "login", duration: 50 }
          );
        }
        notify();
      }
      if (response?.msg == 'Invalid Password') {
        errors.password = "Invalid Password";
        setErrors(errors)
        const notify = () => {
          toast.custom((t) => (
            <div style={toastTheme} >
              <img width="28" height="28" src={Error} alt="crossIcon" />
              <p style={{ color: 'red', backgroundColor: "#171923", }}>Signing In Failed</p>
            </div >
          ),
            { id: "login", duration: 50 }
          );
        }
        notify();
      }
      if (response?.status == 200) {
        const notify = () => {
          toast.custom((t) => (
            <div style={toastTheme}>
              <img width="28" height="28" src={Success} alt="successIcon" />
              <p style={{ color: 'green', backgroundColor: "#171923" }}>Signed In Successfully</p>
            </div >
          ),
            { id: "login", duration: 50 }
          );
        }
        notify();
        localStorage.setItem("token", response.data.token);
        toast.dismiss();
        setTimeout(() => navigate('/workspace'), 500);//not required, just to show case toast properly for smaller data
      }
    } catch (error) {
      console.log(error);
      const notify = () => {
        toast.custom((t) => (
          <div style={toastTheme} >
            <img width="28" height="28" src={Error} alt="crossIcon" />
            <p style={{ color: 'red', backgroundColor: "#171923", }}>Signing In Failed</p>
          </div >
        ),
          { id: "login", duration: 50 }
        );
      }
      notify();
    }
  };

  const handleSignUp = () => {
    toast.dismiss();
    navigate('/signUp');
  }

  return (
    <div className={styles.wrapperContainer}>
      <Toaster
        position="top-center"
        containerStyle={{ margin: "0px auto", width: "250px", height: "100px", backgroundColor: "#171923" }}
      />
      <img className={styles.arrowImg} src={Arrow} alt="arrow" onClick={() => navigate('/')} />
      <img className={styles.triangleImg} src={Triangle} alt="triangle" />
      <img className={styles.ellipse1Img} src={Ellipse1} alt="Ellipse1" />
      <img className={styles.ellipse2Img} src={Ellipse2} alt="Ellipse2" />

      <div className={styles.formContainer}>
        <form className={styles.fieldsContainer} onSubmit={handleSubmit}>
          <div className={styles.emailContainer}>
            <label className={errors.email ? styles.errorLabel : ''}>Email</label>
            <input
              className={errors.email ? styles.errorInput : ''}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
          </div>
          <div className={styles.passwordContainer}>
            <label className={errors.password ? styles.errorLabel : ''}>Password</label>
            <input
              className={errors.password ? styles.errorInput : ''}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
          </div>
          <button type="submit">Log In</button>
          <p>
            Don't have an account? <span onClick={handleSignUp}>Register now</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;