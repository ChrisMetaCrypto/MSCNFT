import {
    ThirdwebNftMedia,
    useAddress,
    useMetamask,
    useNFTDrop,
    useToken,
    useTokenBalance,
    useOwnedNFTs,
    useContract,
  } from "@thirdweb-dev/react";
  import { BigNumber, ethers } from "ethers";
  import type { NextPage } from "next";
  import { useEffect, useState } from "react";
  import styles from "../styles/Home.module.css";
  
  const nftDropContractAddress = "0x8672d236A1cF7A9cc963bc28Ab4A80973791d7b4";
  const tokenContractAddress = "0xefb1cd2B89aA2cd3cAaBbd16f6F457CFA798E8Ed";
  const stakingContractAddress = "0x56081bEAb7Ea0DC7A60107971A96bF9e3C38B36C";
  
  const StakeSilver: NextPage = () => {
    // Wallet Connection Hooks
    const address = useAddress();
    const connectWithMetamask = useMetamask();
  
    // Contract Hooks
    const nftDropContract = useNFTDrop(nftDropContractAddress);
    const tokenContract = useToken(tokenContractAddress);
  
    const { contract, isLoading } = useContract(stakingContractAddress);
  
    // Load Unstaked NFTs
    const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);
  
    // Load Balance of Token
    const { data: tokenBalance } = useTokenBalance(tokenContract, address);
  
    ///////////////////////////////////////////////////////////////////////////
    // Custom contract functions
    ///////////////////////////////////////////////////////////////////////////
    const [stakedNfts, setStakedNfts] = useState<any[]>([]);
    const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
  
    useEffect(() => {
      if (!contract) return;
  
      async function loadStakedNfts() {
        const stakedTokens = await contract?.call("getStakedTokens", address);
  
        // For each staked token, fetch it from the sdk
        const stakedNfts = await Promise.all(
          stakedTokens?.map(
            async (stakedToken: { staker: string; tokenId: BigNumber }) => {
              const nft = await nftDropContract?.get(stakedToken.tokenId);
              return nft;
            }
          )
        );
  
        setStakedNfts(stakedNfts);
        console.log("setStakedNfts", stakedNfts);
      }
  
      if (address) {
        loadStakedNfts();
      }
    }, [address, contract, nftDropContract]);
  
    useEffect(() => {
      if (!contract || !address) return;
  
      async function loadClaimableRewards() {
        const cr = await contract?.call("availableRewards", address);
        console.log("Loaded claimable rewards", cr);
        setClaimableRewards(cr);
      }
  
      loadClaimableRewards();
    }, [address, contract]);
  
    ///////////////////////////////////////////////////////////////////////////
    // Write Functions
    ///////////////////////////////////////////////////////////////////////////
    async function stakeNft(id: BigNumber) {
      if (!address) return;
  
      const isApproved = await nftDropContract?.isApproved(
        address,
        stakingContractAddress
      );
      // If not approved, request approval
      if (!isApproved) {
        await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
      }
      const stake = await contract?.call("stake", id);
    }
  
    async function withdraw(id: BigNumber) {
      const withdraw = await contract?.call("withdraw", id);
    }
  
    async function claimRewards() {
      const claim = await contract?.call("claimRewards");
    }
  
    if (isLoading) {
      return <div>Loading</div>;
    }
  
    return (
      <div className={styles.container}>
        <h1 className={styles.h1}>Silver Vault</h1>
  
        <hr className={`${styles.divider} ${styles.spacerTop}`} />
  
        {!address ? (
          <button className={styles.mainButton} onClick={connectWithMetamask}>
            Connect Wallet
          </button>
        ) : (
          <>
            <p>Stake your Silver NFTs here to earn fuel</p>
            <p>Each NFT can earn 500 Fuel per day</p>
            <hr className={`${styles.divider} ${styles.spacerTop}`} />
  
            <div className={styles.tokenGrid}>
              <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Claimable Rewards</h3>
                <p className={styles.tokenValue}>
                  <b>
                    {!claimableRewards
                      ? "Loading..."
                      : ethers.utils.formatUnits(claimableRewards, 18)}
                  </b>{" "}
                  {tokenBalance?.symbol}
                </p>
              </div>
            </div>
            <button
              className={`${styles.mainButton} ${styles.spacerTop}`}
              onClick={() => claimRewards()}
            >
              Claim Rewards
            </button>
  
            <hr className={`${styles.divider} ${styles.spacerTop}`} />
  
            <h2>Staked NFTs</h2>
            <div className={styles.nftBoxGrid}>
              {stakedNfts?.map((nft) => (
                <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                  <ThirdwebNftMedia
                    metadata={nft.metadata}
                    className={styles.nftMedia}
                  />
                  <h3></h3>
                  <button
                    className={`${styles.unStakeButton} ${styles.spacerBottom}`}
                    onClick={() => withdraw(nft.metadata.id)}
                  >
                    Unstake
                  </button>
                </div>
              ))}
            </div>
  
            <hr className={`${styles.divider} ${styles.spacerTop}`} />
  
            <h2>Unstaked NFTs</h2>
  
            <div className={styles.nftBoxGrid}>
              {ownedNfts?.map((nft) => (
                <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                  <ThirdwebNftMedia
                    metadata={nft.metadata}
                    className={styles.nftMedia}
                  />
                  <h3></h3>
                  <button
                    className={`${styles.stakeButton} ${styles.spacerBottom}`}
                    onClick={() => stakeNft(nft.metadata.id)}
                  >
                    Stake
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default StakeSilver;