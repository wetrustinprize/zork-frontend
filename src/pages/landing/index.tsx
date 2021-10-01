/* eslint-disable @next/next/no-img-element */
import { LandingHeader } from "@components/ZorkLandingHeader"
import Head from "next/head"
import { BiLeftArrow, BiRightArrow } from "react-icons/bi"
import styles from './styles.module.scss'

const Landing: React.FC = () => {
    return(
        <>
            <Head>
                <title>Zork - home</title>
            </Head>

                <LandingHeader/>
                 <main className={styles.landingContainer}>
                     <section>
                        <aside>
                            <h3>Welcome to Zork</h3>
                            <h1>
                                Best way to <br/>
                                make online <br/>
                                transactions <span>.</span>
                            </h1>
                        </aside>
                        <img src="/images/illustration.svg" alt="Illustration" />
                     </section>
                     <footer>
                        <div>
                            <img src="/images/shield.svg" alt="Shield"/>
                            <p>
                                A new way to make the transactions and <br />
                                payments easy, reliable and secure. 
                            </p>
                        </div>
                       
                     </footer>
                </main>
        </>
    )
} 

export default Landing