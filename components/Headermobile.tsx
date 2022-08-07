import { useAddress, useMetamask, useWalletConnect,
  useCoinbaseWallet, useDisconnect } from "@thirdweb-dev/react";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";


export default function HeaderMobile() {
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen)
  }
  const [navbarOpen, setNavbarOpen] = useState(false)
  return (

    
    <nav className={styles.navBar}> 
    <ul><Link href={"/mint"} >Mint</Link></ul>
    <ul><Link href={"/whitepaper"} >Whitepaper</Link></ul>
    <ul><Link href={"/faq"} >FAQ</Link></ul>
 


    </nav>
  )
}
