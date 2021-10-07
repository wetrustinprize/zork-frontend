import Head from "next/head";
import Link from "next/link";

import style from "./404.module.scss";

const FourOhFour: React.FC = () => {
  return (
    <>
      <Head>
        <title>404 - Not Found</title>
      </Head>
      <main className={style.fourohfour}>
        <div className={style.text}>
          <p>This page doesn't exist.</p>
          <Link href={{ pathname: "/" }}>
            <a>Return home.</a>
          </Link>
        </div>
        <div className={style.divider} />
        <div className={style.fourText}>
          <h1>404</h1>
        </div>
      </main>
    </>
  );
};

export default FourOhFour;
