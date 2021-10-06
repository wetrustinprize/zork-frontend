/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss'

export const LandingHeader: React.FC = () => {
    return(
        <header className={styles.headerContainer}>
            <div className={styles.leftSide}>
                <img src="/images/landing-logo.svg" alt="Zork" />
                <h3>Developers</h3>
                <h3>Github</h3>
            </div>
            <div className={styles.rightSide}>
                <button>Sign up</button>
                <button>Log in</button>
            </div>
        </header>
    )
}
