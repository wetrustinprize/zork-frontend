/* eslint-disable @next/next/no-img-element */
import { LandingHeader } from "@components/ZorkLandingHeader";
import Head from "next/head";
import styles from "./index.module.scss";

const Landing: React.FC = () => {
  return (
    <>
      <Head>
        <title>Zork - Home</title>
      </Head>

      <LandingHeader />
      <main className={styles.landingContainer}>
        <section>
          <aside>
            <h3>Welcome to Zork</h3>
            <h1>
              Best way to <br />
              make online <br />
              transactions <span>.</span>
            </h1>
          </aside>
          <img src="/images/illustration.svg" alt="Illustration" />
        </section>
        <footer>
          <div>
            <img src="/images/shield.svg" alt="Shield" />
            <p>
              A new way to make transactions. <br /> Reliable and secure.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Landing;
