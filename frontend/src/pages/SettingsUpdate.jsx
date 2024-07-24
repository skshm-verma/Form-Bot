import React, { useState } from 'react';
import Logout from '../assets/logoutIcon.png';
import styles from './SettingsUpdate.module.css';
import Lock from '../assets/lockIcon.png';
import Eye from '../assets/eyeIcon.png';
import User from '../assets/userIcon.png';

const SettingsUpdate = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({});


  const validate = () => {
    const errors = {};
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Username validation
    if (!userName) errors.name = "Username required";
    // Email validation
    if (!email) errors.email = "Email is required";
    if (!reg.test(String(email).toLowerCase())) errors.email = "Invalid Email"
    // Password validation
    if (!oldPassword) errors.oldPassword = "Password is required";
    if (!newPassword) errors.newPassword = "Password is required";
    if (oldPassword && newPassword && oldPassword === newPassword) errors.newPassword = "New password must be different from old password";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      alert('Form submitted successfully');
      // Handle form submission logic here
    } else {
      setErrors(validationErrors);
    }
  }

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
          <div className={styles.updateInputContainer}>
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
          <div className={styles.updateInputContainer}>
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
          <div className={styles.updateButton}>
            <button type='submit'>Update</button>
          </div>
        </form>
      </div>
      <button className={styles.logoutBtn}><img src={Logout} alt="logoutIcon" /> Log out</button>
    </div>
  )
}

export default SettingsUpdate
