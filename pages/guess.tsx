import { GuessForm } from "@/components/GuessForm";
import { POOH_YELLOW } from "@/constants";
import Head from "next/head";

const GuessPage = () => {
  return (
    <>
      <Head>
        <style>
          {`
            body {
              background-color: ${POOH_YELLOW};
            }
          `}
        </style>
      </Head>
      <GuessForm />
    </>
  );
};

export default GuessPage;
