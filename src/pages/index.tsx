import { useUser } from "@services/User/useUser";
import Head from "next/head";

const Home: React.FC = () => {
  const { user } = useUser();

  return !user ? (
    <>
      <Head>
        <title>Zork</title>
      </Head>

      <h1>Welcome to Zork!</h1>
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
