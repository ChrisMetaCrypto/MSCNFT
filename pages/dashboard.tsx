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
import StakingStandard from "../components/stakingstandard";
import StakingSilver from "../components/stakingsilver";
import StakingGold from "../components/stakinggold";
import StakingNFTStandard from "../components/standardnftstaking";
import StakingNFTSilver from "../components/silvernftstaking";
import StakingNFTGold from "../components/goldnftstaking";



const Dashboard: NextPage = () => {
  const router = useRouter();
  const fueltokenContractAddress = "0xefb1cd2B89aA2cd3cAaBbd16f6F457CFA798E8Ed";
  const nitrotokenContractAddress = "0xEE8522942A73b260129a4799045622345335D08c";
  const fueltokenContract = useToken(fueltokenContractAddress);
  const nitrotokenContract = useToken(nitrotokenContractAddress);
  const stakingContractAddress = "0xca1E3E1Af2e464F4018559266D9eF1DA27cFF9b9";
  const stakingContractAddressSilver = "0x56081bEAb7Ea0DC7A60107971A96bF9e3C38B36C";
  const stakingContractAddressGold = "0xCCCf9Ff1ef61b62015cCE69F4a999B474333461B";



  const address = useAddress();

  const { data: tokenBalancefuel } = useTokenBalance(fueltokenContract, address);

  const { data: tokenBalancenitro } = useTokenBalance(nitrotokenContract, address);
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
  const [claimableRewardsSilver, setClaimableRewardsSilver] = useState<BigNumber>();
  const [claimableRewardsGold, setClaimableRewardsGold] = useState<BigNumber>();

  const { contract, isLoading } = useContract(stakingContractAddress);
  
  useEffect(() => {
    if (!contract || !address) return;

    async function loadClaimableRewards() {
      const cr = await contract?.call("availableRewards", address);
      console.log("Loaded claimable rewards", cr);
      setClaimableRewards(cr);
      
      
    }

    loadClaimableRewards();
  }, [address, contract]);
  
  const nitrobalance =  tokenBalancenitro
  return (
    <>
      {/* Content */}
      <div className={styles.container}>
        {/* Top Section */}
        <h1 className={styles.h1}>Dashboard</h1>
        <p className={styles.explain}>
          Check your staked NFTs and owed rewards
        </p>

        <hr className={styles.divider} />
        <p className={styles.explain}>
          Wallet Balance
        </p>
          <div>
          <h3>
            Fuel : {tokenBalancefuel?.displayValue}
          </h3>
          </div>
          <div>
          <h3>
            Nitro : {tokenBalancenitro?.displayValue}
          </h3>
          </div>
          <hr className={styles.divider} />
          <StakingNFTStandard/> 
          <StakingStandard/>
          <StakingNFTSilver/> 
          <StakingSilver/>
          <StakingNFTGold/>
          <StakingGold/>


      </div>
    </>
  );
};

export default Dashboard;