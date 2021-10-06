import { useUser } from "@hooks/useUser";
import Head from "next/head";

const Home: React.FC = () => {
  const { user } = useUser();

  return !user ? (
    <>
      <Head>
        <title>Zork</title>
      </Head>

      <main>
        <header>
          <h2>Support</h2>
        </header>
      </main>
    </>
  ) : (
    <>
      <Head>
        <title>Zork - {user.zorks}Ƶ</title>
      </Head>

      <h1>Welcome, {user.first_name}!</h1>
    </>
  );
};

export default Home;
