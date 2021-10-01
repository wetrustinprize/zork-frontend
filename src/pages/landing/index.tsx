/* eslint-disable @next/next/no-img-element */
import { LandingHeader } from "@components/ZorkLandingHeader"
import Head from "next/head"
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
                     <div>

                     </div>
                </main>
        </>
    )
} 

export default Landing