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
  useNFTDrop,
  useOwnedNFTs,
  useNFTBalance,
  useNFTCollection
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

export default function StakingNFTStandard() {
  const router = useRouter();
  const fueltokenContractAddress = "0xefb1cd2B89aA2cd3cAaBbd16f6F457CFA798E8Ed";
  const nitrotokenContractAddress = "0xEE8522942A73b260129a4799045622345335D08c";
  const fueltokenContract = useToken(fueltokenContractAddress);
  const nitrotokenContract = useToken(nitrotokenContractAddress);
  const stakingContractAddress = "0xbA0b0bDA0D2c950944Cec94dd224FD033636C309";
  const stakingContractAddressSilver = "0x56081bEAb7Ea0DC7A60107971A96bF9e3C38B36C";
  const stakingContractAddressGold = "0xCCCf9Ff1ef61b62015cCE69F4a999B474333461B";


 

  const address = useAddress();

  const { contract } = useContract(stakingContractAddress);
  const { data: ownerBalance } = useNFTBalance(contract?.nft, address);

  const { data: tokenBalancefuel } = useTokenBalance(fueltokenContract, address);

  const { data: tokenBalancenitro } = useTokenBalance(nitrotokenContract, address);
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
  //const [numberofNFTs, setnumberofNFTs] = useState();
  
  const [numbernfts, setnumbernfts] = useState<BigNumber>();
 
  //const nftsowned = ethers.utils.formatUnits({ownerBalance}, 18)};
 
  useEffect(() => {

    if (!contract || !address) return;

    async function loadClaimableRewards() {
      const cr = await contract?.call("balanceOf", address);
      console.log("Loaded claimable rewards", cr);
      setClaimableRewards(cr);
    }

    loadClaimableRewards();
  }, [address, contract]);

 
  return (
    <>
        <p className={styles.explainStandard}>
        Standard NFTs
        </p>
          <div>
          <b>
                    {!claimableRewards
                      ? "Loading..."
                      : ethers.utils.formatUnits(claimableRewards, 0)}
                  </b> : NFT/s Owned but currently not staked
          </div>
    </>
  );
};

