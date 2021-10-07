/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.scss";
import Link from "next/link";

export const LandingHeader: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.leftSide}>
        <img src="/images/landing-logo.svg" alt="Zork" />
        <Link
          href={{ pathname: "https://github.com/wetrustinprize/zork-frontend" }}
        >
          <a>
            {" "}
            <h3>Github / Developers</h3>
          </a>
        </Link>
      </div>
      <div className={styles.rightSide}>
        <Link href={{ pathname: "/signup" }}>
          <button>
            <a>Sign up</a>
          </button>
        </Link>
        <Link href={{ pathname: "/login" }}>
          <button>
            <a>Log in</a>
          </button>
        </Link>
      </div>
    </header>
  );
};
