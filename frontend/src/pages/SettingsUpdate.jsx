import React, { useState, useEffect } from 'react';
import { updateUserDetails } from '../helpers/api-communicator';
import { useAuth } from '../context/AllContext';
import Logout from '../assets/logoutIcon.png';
import Lock from '../assets/lockIcon.png';
import Eye from '../assets/eyeIcon.png';
import User from '../assets/userIcon.png';
import Success from '../assets/success.png';
import styles from './SettingsUpdate.module.css';
import { useNavigate } from 'react-router-dom';


const SettingsUpdate = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [showEmail, setShowEmail] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [updateToast, setUpdateToast] = useState(false);

  const validate = () => {
    const errors = {};
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Username validation
    if (!userName) errors.userName = "Username is required";

    // Email validation
    if (!email) errors.email = "Email is required";
    else if (!reg.test(String(email).toLowerCase())) errors.email = "Invalid Email";

    // Password validation
    if (!oldPassword) errors.oldPassword = "Old password is required";
    if (!newPassword) errors.newPassword = "New password is required";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const response = await updateUserDetails(auth?.userId, userName, email, oldPassword, newPassword);

      if (response.data?.msg === 'Email already registered') {
        setErrors(prevErrors => ({ ...prevErrors, email: 'Email already registered' }));
      }
      if (response.data?.msg === 'Old password is incorrect') {
        setErrors(prevErrors => ({ ...prevErrors, oldPassword: 'Old password is incorrect', email: '' }));
      }
      if (response?.msg === 'User updated successfully') {
        localStorage.setItem("token", response?.token);
        setUpdateToast(true);
        setTimeout(() => setUpdateToast(false), 800)
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleLogout = () => {
    localStorage.setItem("token", '');
    window.location.reload();
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      const status = await auth?.checkAuthStatus();
      if (status === 401) {
        navigate('/');
      }
    };
    checkLoginStatus();
  }, [auth])

  return (
    <div className={styles.settingsWrapper}>
      <div className={styles.formUpdateContainer}>
        <form onSubmit={handleSubmit}>
          <h2>Settings</h2>
          <div className={styles.updateInputContainer}>
            <img className={styles.userIconImg} src={User} alt="userIcon" />
            <input
              type="text"
              placeholder='Name'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className={`${styles.updateInputContainer} ${errors.email ? styles.errorInput : ''}`}>
            <img className={styles.lockIconImg} src={Lock} alt="lockIcon" />
            <input
              type={showEmail ? 'text' : 'email'}
              placeholder='Update Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <img className={styles.eyeIconImg} src={Eye} alt="eyeIcon" onClick={() => setShowEmail(!showEmail)} />
          </div>
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          <div className={`${styles.updateInputContainer} ${errors.oldPassword ? styles.errorInput : ''}`}>
            <img className={styles.lockIconImg} src={Lock} alt="lockIcon" />
            <input
              type={showOldPassword ? 'text' : 'password'}
              placeholder='Old Password'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <img className={styles.eyeIconImg} src={Eye} alt="eyeIcon" onClick={() => setShowOldPassword(!showOldPassword)} />
          </div>
          {errors.oldPassword && <p className={styles.errorText}>{errors.oldPassword}</p>}
          <div className={styles.updateInputContainer}>
            <img className={styles.lockIconImg} src={Lock} alt="lockIcon" />
            <input
              type={showNewPassword ? 'text' : 'password'}
              placeholder='New Password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <img className={styles.eyeIconImg} src={Eye} alt="eyeIcon" onClick={() => setShowNewPassword(!showNewPassword)} />
          </div>
          {errors.newPassword && <p className={styles.errorText}>{errors.newPassword}</p>}
          <div onClick={handleSubmit} className={styles.updateButton}>
            <button type='submit' >Update</button>
          </div>
        </form>
      </div>
      <button
        onClick={handleLogout}
        className={styles.logoutBtn}>
        <img src={Logout} alt="logoutIcon" /> Log out
      </button>
      {updateToast && <div className={styles.toastDiv}>
        <img src={Success} alt="successIcon" />
        <span>Updated Successfully</span>
      </div>}
    </div>
  )
}

export default SettingsUpdate
