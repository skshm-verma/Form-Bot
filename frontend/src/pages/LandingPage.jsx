import React from 'react'
import LandingPageNavbar from '../components/navbars/LandingPageNavbar'
import styles from './LandingPage.module.css'
import Triangle from '../assets/triangleImage1.png';
import SemiCircle from '../assets/semiCircle.png';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.wrapperContainer}>
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
            </section>
        </div>
    )
}

export default LandingPage
