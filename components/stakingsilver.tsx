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
  useContract,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";


export default function StakingSilver() {
    const router = useRouter();
  const fueltokenContractAddress = "0xefb1cd2B89aA2cd3cAaBbd16f6F457CFA798E8Ed";
  const nitrotokenContractAddress = "0xEE8522942A73b260129a4799045622345335D08c";
  const fueltokenContract = useToken(fueltokenContractAddress);
  const nitrotokenContract = useToken(nitrotokenContractAddress);
  const stakingContractAddress = "0xca1E3E1Af2e464F4018559266D9eF1DA27cFF9b9";
  const stakingContractAddressSilver = "0x7135FDe9344062EcD0C1B6a06E7Ea5C84cdc972d";
  const stakingContractAddressGold = "0xCCCf9Ff1ef61b62015cCE69F4a999B474333461B";



  const address = useAddress();

  const { data: tokenBalancefuel } = useTokenBalance(fueltokenContract, address);

  const { data: tokenBalancenitro } = useTokenBalance(nitrotokenContract, address);
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

  const { contract, isLoading } = useContract(stakingContractAddressSilver);
  
  
  useEffect(() => {
    if (!contract || !address) return;

    async function loadClaimableRewards() {
      const cr = await contract?.call("availableRewards", address);
      console.log("Loaded claimable rewards", cr);
      setClaimableRewards(cr);
      
      
    }

    loadClaimableRewards();
  }, [address, contract]);

  return (
    <>
          <div>
          <h3 className={styles.tokenValue}>
                  <b>
                    {!claimableRewards
                      ? "Loading..."
                      : ethers.utils.formatUnits(claimableRewards, 18)}
                  </b> : FUEL Pending
                </h3>
          </div>
          <Link href="/stakesilver">
            <a className={styles.silverButton} style={{ textDecoration: "none"  ,color:"#8529B2"}}>
              Silver Vault
            </a>
          </Link>
          <hr className={styles.divider} />
    </>
  );
};

