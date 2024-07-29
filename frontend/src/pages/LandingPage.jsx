import React from 'react';
import LandingPageNavbar from '../components/navbars/LandingPageNavbar';
import Triangle from '../assets/triangleImage1.png';
import SemiCircle from '../assets/semiCircle.png';
import { useNavigate } from 'react-router-dom';
import WorkingFLow from '../assets/workingFlow.png';
import WorkingImage from '../assets/workingImage2.png';
import OldFormImage from '../assets/formImage1.png';
import TryImage from '../assets/tryImage.png';
import Correct from '../assets/correctIcon.png';
import Cross from '../assets/crossIcon.png';
import WorkImage1 from '../assets/workingImage1.png';
import WorkImage2 from '../assets/workingImage3.png';
import WorkImage3 from '../assets/workingImage4.png';
import Tools1 from '../assets/platforms1.png';
import Tools2 from '../assets/platforms2.png';
import Contact from '../assets/contactShare.png';
import Hidden from '../assets/hiddenFields.png';
import Folder from '../assets/folder.png';
import Share from '../assets/share.png';
import LinkShare from '../assets/linkShare.png';
import Code from '../assets/customCode.png';
import Creator1 from '../assets/creators1.png';
import Creator2 from '../assets/creators2.png';
import Creator3 from '../assets/creators3.png';
import Creator4 from '../assets/creators4.png';
import Creator5 from '../assets/creators5.png';
import Creator6 from '../assets/creators6.png';
import Creator7 from '../assets/creators7.png';
import Creator8 from '../assets/creators8.png';
import Link from '../assets/openLink.png';
import styles from './LandingPage.module.css';

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
            <section id="aboutWork">
                <div className={styles.aboutWorkWrapper1}>
                    <div className={styles.workImg1}><img width="400px" height="400px" src={WorkImage1} alt="workImage!" /></div>
                    <div className={styles.aboutWork1}>
                        <h2>Easy building experience</h2>
                        <p>All you have to do is drag and drop blocks to create your app. Even if you have custom needs, you can always add custom code.</p>
                    </div>
                </div>
                <div className={styles.aboutWorkWrapper2}>
                    <div className={styles.aboutWork1}>
                        <h2>Embed it in a click</h2>
                        <p>Embedding your typebot in your applications is a walk in the park. Typebot gives you several step-by-step platform- specific instructions. Your typebot will always feel "native".</p>
                    </div>
                    <div className={styles.workImg1}><img width="400px" height="400px" src={WorkImage2} alt="workImage!" /></div>
                </div>
            </section>
            <section id='integrationTools'>
                <div className={styles.toolsContainer}>
                    <div><img src={Tools1} alt="tools1Image" /></div>
                    <div><img src={Tools2} alt="tools2Image" /></div>
                    <div className={styles.toolsAbout}>
                        <h2>Integrate with any platform</h2>
                        <p>Typebot offers several native integrations blocks as well as instructions on<br /> how to embed typebot on particular platforms</p>
                    </div>
                </div>
            </section>
            <section id="results">
                <div className={styles.resultContainer}>
                    <div className={styles.resultAbout}>
                        <h2>Collect results in real-time</h2>
                        <p>One of the main advantage of a chat application is that you collect the user's responses on each question.<br /><span>You won't lose any valuable data.</span></p>
                    </div>
                    <div>
                        <img width="400px" height="400px" src={WorkImage3} alt="workImage3" />
                    </div>
                </div>
            </section>
            <section id="features">
                <div className={styles.featuresContainer}>
                    <div className={styles.featuresHeading}>
                        <h2>And many more features</h2>
                        <p>Typebot makes form building easy and comes with powerful features</p>
                    </div>
                    <div className={styles.features}>
                        <div className={styles.eachFeature}>
                            <span><img src={Hidden} alt="hiddenFieldIcon" /></span>
                            <h3>Hidden fields</h3>
                            <p>Include data in your form URL to segment your user and use its data directly in your form.</p>

                        </div>
                        <div className={styles.eachFeature}>
                            <span><img src={Contact} alt="contactIcon" /></span>
                            <h3>Team collaboration</h3>
                            <p>Invite your teammates to work on your typebots with you</p>
                        </div>
                        <div className={styles.eachFeature}>
                            <span><img src={LinkShare} alt="shareIcon" /></span>
                            <h3>Link to sub typebots</h3>
                            <p>Reuse your typebots in different parent bots.</p>
                        </div>
                        <div className={styles.eachFeature}>
                            <span><img src={Share} alt="shareIcon" /></span>
                            <h3>Custom code</h3>
                            <p>Customize everything with your own Javascript & CSS code</p>
                        </div>
                        <div className={styles.eachFeature}>
                            <span><img src={Folder} alt="folderIcon" /></span>
                            <h3>Custom domain</h3>
                            <p>Connect your typebot to the custom URL of your choice</p>
                        </div>
                        <div className={styles.eachFeature}>
                            <span><img src={Code} alt="customCodeIcon" /></span>
                            <h3>Folder management</h3>
                            <p>Organize your typebots in specific folders to keep it clean and work with multiple clients</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="clients">
                <div className={styles.clientsContainer}>
                    <h2>Loved by teams and creators from all around the world</h2>

                    <div className={styles.allClients}>
                        <img src={Creator2} alt="creatorsImg" />
                        <img src={Creator1} alt="creatorsImg" />
                        <img src={Creator3} alt="creatorsImg" />
                        <img src={Creator4} alt="creatorsImg" />
                        <img src={Creator8} alt="creatorsImg" />
                        <img src={Creator7} alt="creatorsImg" />
                        <img src={Creator6} alt="creatorsImg" />
                        <img src={Creator5} alt="creatorsImg" />
                    </div>
                </div>
            </section>
            <section id="conclusion">
                <div className={styles.conclusionContainer}>
                    <img className={styles.triangle1} src={Triangle} alt="triangleImage" />
                    <div className={styles.conclusionHeading}>
                        <h2>Improve conversion and user engagement<br /> with FormBots</h2>
                        <button onClick={() => navigate('/signUp')}>Create a FormBot</button>
                        <p>No trial. Generous free plan.</p>
                    </div>
                    <img className={styles.semiCircle1} src={SemiCircle} alt="semiCircleImage" />
                </div>
            </section>
            <section id='footer'>
                <div className={styles.footerContainer}>
                    <div className={styles.eachFootItem}>
                        <p>Made with ❤️ by<br /> <a>@Saksham</a></p>
                    </div>
                    <div className={styles.eachFootItem}>
                        <span>Status<img src={Link} alt="linkIcon" /></span>
                        <span>Documentation<img src={Link} alt="linkIcon" /></span>
                        <span>Roadmap<img src={Link} alt="linkIcon" /></span>
                        <span>Pricing<img src={Link} alt="linkIcon" /></span>
                    </div>
                    <div className={styles.eachFootItem}>
                        <span>Discord<img src={Link} alt="linkIcon" /></span>
                        <span>GitHub repository<img src={Link} alt="linkIcon" /></span>
                        <span>Twitter<img src={Link} alt="linkIcon" /></span>
                        <span>LinkedIn<img src={Link} alt="linkIcon" /></span>
                        <span>OSS Friends</span>
                    </div>
                    <div className={styles.eachFootItem}>
                        <span>About</span>
                        <span>Contact</span>
                        <span>Terms of Service</span>
                        <span>Privacy Policy</span>
                    </div>
                </div>
            </section>
        </div >
    )
}

export default LandingPage
