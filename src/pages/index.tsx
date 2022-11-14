import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { Dummy } from "src/components/dummy";

const Home: NextPage = () => {
  return (
    <div>
      <Dummy />
      <Link href="/about">About</Link>
    </div>
  );
};

export const getStaticProps: GetStaticProps = () => {
  return { props: {} };
};

export default Home;
