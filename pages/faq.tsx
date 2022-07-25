import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {
  MediaRenderer,
  useActiveListings,
  useMarketplace,
  useAddress,
  useToken,
  useTokenBalance,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Accordion from "../components/accordion";

const FAQ: NextPage = () => {
  const router = useRouter();
  const fueltokenContractAddress = "0xefb1cd2B89aA2cd3cAaBbd16f6F457CFA798E8Ed";
  const nitrotokenContractAddress = "0xEE8522942A73b260129a4799045622345335D08c";
  const fueltokenContract = useToken(fueltokenContractAddress);
  const nitrotokenContract = useToken(nitrotokenContractAddress);



  const address = useAddress();

  const { data: tokenBalancefuel } = useTokenBalance(fueltokenContract, address);

  const { data: tokenBalancenitro } = useTokenBalance(nitrotokenContract, address);

  return (
    <>
      {/* Content */}
      <div className={styles.container}>
        {/* Top Section */}
        <h1 className={styles.h1}> FAQs</h1>
        <p className={styles.explain}>
        </p>
        <hr className={styles.divider} />
        <div>
        <Accordion title="Why are the differnet types of NFTs?" content="There are 3 different types of NFTs Standard, Silver & Gold. There are diffent catergories of NFTs to ensure the longevity of the game"/>
        <Accordion title="How much do the NFTs Cost?" content="Standard Costs 3 Avax, Silver costs 1,500 Fuel & Gold costs 25,000 Fuel" />
        <Accordion title="What can you earn?" content="Standard NFTs earn 100 Fuel per day, Silver NFTs earn 500 Fuel per day & Gold NFTs earn 10 Nitro per day" />
        <Accordion title="Why can I not see my NFT in my wallet?" content="When your NFT is being staked to earn Fuel or Nitro it is being held inside the NFT Staking contract. You must unstake the NFT if you want to see it in your wallet or to resell on it on a marketplace " />
        <Accordion title="Can you resell your NFTs?" content="Yes you are able to list and resell your NFTs on Avalance marketplaces such as NFT Trade" />

        </div>
        
        <hr className={styles.divider} />
        
        </div>
       
    </>
  );
};

export default FAQ;
