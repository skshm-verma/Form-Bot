import React from 'react'
import LandingPageNavbar from '../components/navbars/LandingPageNavbar'
import styles from './LandingPage.module.css'
import Triangle from '../assets/triangleImage1.png';
import SemiCircle from '../assets/semiCircle.png';
import { useNavigate } from 'react-router-dom';
import WorkingFLow from '../assets/workingFlow.png';
import WorkingImage from '../assets/workingImage2.png';
import OldFormImage from '../assets/formImage1.png';
import TryImage from '../assets/tryImage.png';
import Correct from '../assets/correctIcon.png';
import Cross from '../assets/crossIcon.png'

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.wrapperContainer}>
            <div className={styles.blurEffect1}></div>
            <div className={styles.blurEffect2}></div>
            <nav>
                <LandingPageNavbar />
            </nav>
            <section id='preView'>
                <div className={styles.previewSection}>
                    <img src={Triangle} alt="triangleImage" />
                    <div className={styles.headingSection}>
                        <h1>Build advanced chatbots visually</h1>
                        <p>Typebot gives you powerful blocks to create unique chat experiences. Embed them
                            anywhere on your web/mobile apps and start collecting results like magic.</p>
                        <button onClick={() => navigate('/signUp')}>Create a FormBot for free</button>
                    </div>
                    <img src={SemiCircle} alt="semiCircleImage" />
                </div>
                <div className={styles.flowDiagramImage}>
                    <img src={WorkingFLow} alt="workingFLowImage" />
                </div>
            </section>
            <section id='newWays'>
                <div className={styles.oldWaysContainer}>
                    <h1>Replace your old school forms<br />with<br />chatbots</h1>
                    <p>Typebot is a better way to ask for information. It leads to an increase in customer satisfaction and retention and multiply by <br />3<br /> your conversion rate compared to classical forms.</p>
                    <div className={styles.differentImgContainer}>
                        <div className={styles.oldTypeForms}>
                            <img src={Cross} alt="crossIcon" />
                            <img src={OldFormImage} alt="oldFormImage" />
                        </div>
                        <div className={styles.newTypeForms}>
                            <img src={Correct} alt="correctIcon" />
                            <img src={WorkingImage} alt="newFormImage" />
                        </div>
                        <img className={styles.tryOutImage} src={TryImage} alt="" />
                    </div>
                </div>
            </section>
            <div className={styles.extraDiv}>

            </div>
        </div>
    )
}

export default LandingPage
