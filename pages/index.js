import Feature from "@/components/Feature";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>PC Builder - Build and shop for pc</title>
        <meta
          name="description"
          content="we offer pc parts and pc builds at better prices"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Image height={2500} width={2500} src="/banner.png" alt="banner" />
      </div>
      <Feature />
    </>
  );
}
