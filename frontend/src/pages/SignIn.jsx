import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { signInUser } from '../helpers/api-communicator';
import styles from './SignIn.module.css';
import Triangle from '../assets/triangleImage2.png';
import Ellipse1 from '../assets/ellipseImage1.png';
import Ellipse2 from '../assets/ellipseImage2.png';
import Arrow from '../assets/backArrow.png'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signInUser(email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles['wrapper-container']}>
      <img className={styles['arrow-img']} src={Arrow} alt="arrow" />
      <img className={styles['triangle-img']} src={Triangle} alt="triangle" />
      <img className={styles['Ellipse1-img']} src={Ellipse1} alt="Ellipse1" />
      <img className={styles['Ellipse2-img']} src={Ellipse2} alt="Ellipse2" />
      <div className={styles['form-container']}>
        <form className={styles['fields-container']} onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" placeholder='Enter your email' value={email} onInput={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" placeholder='Enter your password' value={password} onInput={(e) => setPassword(e.target.value)} />
          <button type='submit'>Log In</button>
          <p>Don't have an account? <span onClick={() => navigate('/signUp')}>Register now</span></p>
        </form>
      </div>
    </div>
  )
}

export default SignIn
