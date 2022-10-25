import { useAddress, useMetamask, useWalletConnect,
  useCoinbaseWallet, useDisconnect } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import styles from "../styles/Home.module.css";


export default function Header() {
  // Helpful thirdweb hooks to connect and manage the wallet from metamask.
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  return (
    <div className={styles.header}>
      <div className={styles.center}>
        <div>
          <Link href="/" passHref role="button">
            <img
              src={`/msclogo.png`}
              alt="MSC Logo"
              width={135}
              style={{ cursor: "pointer" }}
            />
          </Link>
        </div>
      </div>
      {/* <div className={styles.left}> 
        <Link href="/dashboard" >
        <h3  style={{ cursor: "pointer", color: "#CA2ADE" }}>Dashboard</h3>
        </Link>
      </div> */}
      {/* <div className={styles.left}> 
        <Link href="/mint" >
        <h3  style={{ cursor: "pointer" , color: "#CA2ADE"}}>Mint</h3>
        </Link>
      </div> */}
      {/* <div className={styles.left}> 
        <Link href="/stake" >
        <h3  style={{ cursor: "pointer", color:"#CD7F32" }}> Standard Staking</h3>
        </Link>
      </div>
      <div className={styles.left}> 
        <Link href="/stakesilver" >
        <h3  style={{ cursor: "pointer", color:"#C0C0C0" }}>Silver Staking</h3>
        </Link>
      </div>
      <div className={styles.left}> 
        <Link href="/stakegold" >
        <h3  style={{ cursor: "pointer", color:"#CFB53B" }}>Gold Staking</h3>
        </Link>
      </div> */}
      {/* <div className={styles.left}> 
        <Link href="/whitepaper" >
        <h3  style={{ cursor: "pointer", color: "#CA2ADE" }}>WhitePaper</h3>
        </Link>
      </div>
      <div className={styles.left}> 
        <Link href="/faq" >
        <h3  style={{ cursor: "pointer", color: "#CA2ADE" }}>FAQ</h3>
        </Link>
      </div>
     */}
      
      </div>
    
  );
}
