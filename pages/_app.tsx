import React from "react";
import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Head from "next/head";
import ThirdwebGuideFooter from "../components/ThirdwebGuideFooter";
import Header from "../components/Header";
import WalletBalance from "../components/WalletBalance";
import HeaderMobile from "../components/Headermobile";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Avalanche;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider 

    desiredChainId={activeChainId}>

      <Head>
        <title>MetaSpeedClub</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="MSC NFTs"
        />
        <meta
          name="keywords"
          content="NFT, Aptos"
        />
      </Head>
      <Header/>
     
      <Component {...pageProps} />
      <ThirdwebGuideFooter />
    </ThirdwebProvider>
  );
}

export default MyApp;
