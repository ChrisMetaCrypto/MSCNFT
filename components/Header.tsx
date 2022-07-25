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
      <div className={styles.left}>
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
      <div className={styles.center}> 
        <Link href="/dashboard" >
        <h3  style={{ cursor: "pointer", color: "#CA2ADE" }}>Dashboard</h3>
        </Link>
      </div>
      <div className={styles.center}> 
        <Link href="/mint" >
        <h3  style={{ cursor: "pointer" , color: "#CA2ADE"}}>Mint</h3>
        </Link>
      </div>
      <div className={styles.center}> 
        <Link href="/stake" >
        <h3  style={{ cursor: "pointer", color:"#CD7F32" }}> Standard Staking</h3>
        </Link>
      </div>
      <div className={styles.center}> 
        <Link href="/stakesilver" >
        <h3  style={{ cursor: "pointer", color:"#C0C0C0" }}>Silver Staking</h3>
        </Link>
      </div>
      <div className={styles.center}> 
        <Link href="/stakegold" >
        <h3  style={{ cursor: "pointer", color:"#CFB53B" }}>Gold Staking</h3>
        </Link>
      </div>
      <div className={styles.center}> 
        <Link href="/whitepaper" >
        <h3  style={{ cursor: "pointer", color: "#CA2ADE" }}>WhitePaper</h3>
        </Link>
      </div>
      <div className={styles.center}> 
        <Link href="/faq" >
        <h3  style={{ cursor: "pointer", color: "#CA2ADE" }}>FAQ</h3>
        </Link>
      </div>
      <div className={styles.right}>
        {address ? (
          <>
            <a
              className={styles.secondaryButton}
              onClick={() => disconnectWallet()}
            >
              Disconnect Wallet
            </a>
            <p style={{ marginLeft: 8, marginRight: 8, color: "grey" }}>|</p>
            <p>{address.slice(0, 6).concat("...").concat(address.slice(-4))}</p>
          </>
        ) : (
          <a
            className={styles.mainButton}
            onClick={() => connectWithMetamask()}
          >
            Connect Wallet
          </a>
        )}
      </div>
    </div>
    
  );
}
