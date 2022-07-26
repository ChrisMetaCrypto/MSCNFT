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
    <div className={styles.headermobile}>
     
      <div className={styles.centermobile}> 
        <Link href="/dashboard" >
        <h3  style={{ cursor: "pointer", color: "#CA2ADE" }}>Dashboard</h3>
        </Link>
      </div>
      <div className={styles.centermobile}> 
        <Link href="/mint" >
        <h3  style={{ cursor: "pointer" , color: "#CA2ADE"}}>Mint</h3>
        </Link>
      </div>
      <div className={styles.centermobile}> 
        <Link href="/stake" >
        <h3  style={{ cursor: "pointer", color:"#CD7F32" }}> Standard Staking</h3>
        </Link>
      </div>
      <div className={styles.centermobile}> 
        <Link href="/stakesilver" >
        <h3  style={{ cursor: "pointer", color:"#C0C0C0" }}>Silver Staking</h3>
        </Link>
      </div>
      <div className={styles.centermobile}> 
        <Link href="/stakegold" >
        <h3  style={{ cursor: "pointer", color:"#CFB53B" }}>Gold Staking</h3>
        </Link>
      </div>
      <div className={styles.centermobile}> 
        <Link href="/whitepaper" >
        <h3  style={{ cursor: "pointer", color: "#CA2ADE" }}>WhitePaper</h3>
        </Link>
      </div>
      <div className={styles.centermobile}> 
        <Link href="/faq" >
        <h3  style={{ cursor: "pointer", color: "#CA2ADE" }}>FAQ</h3>
        </Link>
      </div>
      </div>
    
  );
}
