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
import {pdfjs, Document, Page} from 'react-pdf'

const WhitePaper: NextPage = () => {
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
        <h1 className={styles.h1}>Whitepaper</h1>
        <p className={styles.explain}>
        </p>
          <hr className={styles.divider} />
        </div>
        
        <object data="https://docdro.id/eqtF30u" type="application/pdf" width="100%" height="100%">
      <p>Alternative text - include a link <a href="https://docdro.id/eqtF30u">to the PDF!</a></p>
      </object>
       
    </>
  );
};

export default WhitePaper;
