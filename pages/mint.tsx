import {
    ChainId,
    useClaimedNFTSupply,
    useContractMetadata,
    useNetwork,
    useNFTDrop,
    useUnclaimedNFTSupply,
    useActiveClaimCondition,
    useClaimNFT,
    useWalletConnect,
    useCoinbaseWallet,
  } from '@thirdweb-dev/react';
  import { useNetworkMismatch } from '@thirdweb-dev/react';
  import { useAddress, useMetamask } from '@thirdweb-dev/react';
  import { formatUnits, parseUnits } from 'ethers/lib/utils';
  import type { NextPage } from 'next';
  import { useState } from 'react';
  import styles from '../styles/Theme.module.css';
  import styles2 from "../styles/Home.module.css";
  //import { useRouter } from "next/router";
import styled from 'styled-components';
import { MintRequest721 } from '@thirdweb-dev/sdk';

  const StyledRightArrowButton = styled.div`
  color: white;
  width: 0px;
  height: 0px;
  border: 30px solid black;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: white;
  cursor:pointer;
`

const StyledLeftArrowButton = styled.div`
  color: white;
  width: 0px;
  height: 0px;
  border: 30px solid black;
  border-top-color: transparent;
  border-right-color: white;
  border-bottom-color: transparent;
  border-left-color: transparent;
  cursor: pointer;
`
  
  // Put Your NFT Drop Contract address from the dashboard here
  const myNftDropContractAddress = '0xAE4d2CB220AAaE62FC464255a5B466f5c2826CBD';  
  const myNftDropContractAddress2 = '0x2404B34463164A96528624104ddD2811a363AbDE';
 // const myNftDropContractAddress3 = '0xf4A0980a1dc78181957F090017E27229478984Fc';

  
  const Mint: NextPage = () => {
   // const router = useRouter();
    const networkMismatch = useNetworkMismatch();
    const nftDrop = useNFTDrop(myNftDropContractAddress);
    // const nftDropSilver = useNFTDrop(myNftDropContractAddress2);
    // const nftDropGold = useNFTDrop(myNftDropContractAddress3);
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    const isOnWrongNetwork = useNetworkMismatch();
    const claimNFT = useClaimNFT(nftDrop);
    // const claimNFTSilver = useClaimNFT(nftDropSilver);
    // const claimNFTGold = useClaimNFT(nftDropGold);
    const [, switchNetwork] = useNetwork();
  
    // The amount the user claims
    const [quantity, setQuantity] = useState(1); // default to 1
    const [quantitySilver, setQuantitySilver] = useState(1); // default to 1
    const [quantityGold, setQuantityGold] = useState(1); // default to 1
    // Load contract metadata
    const { data: contractMetadata } = useContractMetadata(
      myNftDropContractAddress,
    );
  
    // Load claimed supply and unclaimed supply
    const { data: unclaimedSupply } = useUnclaimedNFTSupply(nftDrop);
    const { data: claimedSupply } = useClaimedNFTSupply(nftDrop);
  
    // Load the active claim condition
    const { data: activeClaimCondition } = useActiveClaimCondition(nftDrop);
  
    // Check if there's NFTs left on the active claim phase
    const isNotReady =
      activeClaimCondition &&
      parseInt(activeClaimCondition?.availableSupply) === 0;
  
    // Check if there's any NFTs left
    const isSoldOut = unclaimedSupply?.toNumber() === 0;
  
 
    // Check price
    const price = parseUnits(
      activeClaimCondition?.currencyMetadata.displayValue || '0',
      activeClaimCondition?.currencyMetadata.decimals,
    );

    const switchtoAva = async () => {
      switchNetwork && switchNetwork(ChainId.Avalanche);
      return;
    }
     
    // Load contract metadata
    // const { data: contractMetadataGold } = useContractMetadata(
    //     myNftDropContractAddress3,
    //   );

    // Load claimed supply and unclaimed supply
    // const { data: unclaimedSupplyGold } = useUnclaimedNFTSupply(nftDropGold);
    // const { data: claimedSupplyGold } = useClaimedNFTSupply(nftDropGold);
  
    // // Load the active claim condition
    // const { data: activeClaimConditionGold } = useActiveClaimCondition(nftDropGold);
  
    // Check if there's NFTs left on the active claim phase
    // const isNotReadyGold =
    //   activeClaimConditionGold &&
    //   parseInt(activeClaimConditionGold?.availableSupply) === 0;
  
    // // Check if there's any NFTs left
    // const isSoldOutGold = unclaimedSupplyGold?.toNumber() === 0;
  
    // // Check price
    // const priceGold = parseUnits(
    //   activeClaimConditionGold?.currencyMetadata.displayValue || '0',
    //   activeClaimConditionGold?.currencyMetadata.decimals,
    // );
  
    //   // Load contract metadata
    //   const { data: contractMetadataSilver } = useContractMetadata(
    //     myNftDropContractAddress2,
    //   );

    // // Load claimed supply and unclaimed supply
    // const { data: unclaimedSupplySilver } = useUnclaimedNFTSupply(nftDropSilver);
    // const { data: claimedSupplySilver } = useClaimedNFTSupply(nftDropSilver);
  
    // // Load the active claim condition
    // const { data: activeClaimConditionSilver } = useActiveClaimCondition(nftDropSilver);
  
    // // Check if there's NFTs left on the active claim phase
    // const isNotReadySilver =
    //   activeClaimConditionSilver &&
    //   parseInt(activeClaimConditionSilver?.availableSupply) === 0;
  
    // // Check if there's any NFTs left
    // const isSoldOutSilver = unclaimedSupplySilver?.toNumber() === 0;
  
    // // Check price
    // const priceSilver = parseUnits(
    //   activeClaimConditionSilver?.currencyMetadata.displayValue || '0',
    //   activeClaimConditionSilver?.currencyMetadata.decimals,
    // );
  
    // Multiply depending on quantity
    const priceToMint = price.mul(quantity);
      // Multiply depending on quantity
     // const priceToMintSilver = priceSilver.mul(quantitySilver);
        // Multiply depending on quantity
   // const priceToMintGold = priceGold.mul(quantityGold);
  
    // Loading state while we fetch the metadata
    if (!nftDrop || !contractMetadata) {
      return <div className={styles.container}>Loading...</div>;
    }
  
    // Function to mint/claim an NFT
    const mint = async () => {
      if (isOnWrongNetwork) {
        switchNetwork && switchNetwork(ChainId.Avalanche);
        return;
      }
  
      claimNFT.mutate(
        { to: address as string, quantity : quantity},
        {
          onSuccess: () => {
            alert(`Successfully minted NFT${quantity > 1 ? 's' : ''}!`);
          },
          onError: (err: any) => {
            console.error(err);
            alert(err?.message || 'Something went wrong');
          },
        },
      );
    };

    // const mintsilver = async () => {
    //     if (isOnWrongNetwork) {
    //       switchNetwork && switchNetwork(ChainId.Avalanche);
    //       return;
    //     }
    
    //     claimNFTSilver.mutate(
    //       { to: address as string, quantity : quantitySilver},
    //       {
    //         onSuccess: () => {
    //           alert(`Successfully minted NFT${quantitySilver > 1 ? 's' : ''}!`);
    //         },
    //         onError: (err: any) => {
    //           console.error(err);
    //           alert(err?.message || 'Something went wrong');
    //         },
    //       },
    //     );
    //   };

    //   const mintgold = async () => {
    //     if (isOnWrongNetwork) {
    //       alert("Please switch to Avavlance Chain")
    //       switchNetwork && switchNetwork(ChainId.Avalanche);
    //       return;
    //     }
    
    //     claimNFTGold.mutate(
    //       { to: address as string, quantity: quantityGold},
    //       {
    //         onSuccess: () => {
    //           alert(`Successfully minted NFT${quantityGold> 1 ? 's' : ''}!`);
    //         },
    //         onError: (err: any) => {
    //           console.error(err);
    //           alert(err?.message || 'Something went wrong');
    //         },
    //       },
    //     );
    //   };
  
    return (
      <div className={styles.container}>
        <div className={styles.mintInfoContainer}>
        
  
          <div className={styles.imageSide}>
          <h2>Standard NFTs</h2>
          <h3>Earns 100 $Fuel per day</h3>

            {/* Image Preview of NFTs */}
            <img
              className={styles.image}
              src={contractMetadata?.image}
              alt={`${contractMetadata?.name} preview image`}
            />
  
            {/* Amount claimed so far */}
            <div className={styles.mintCompletionArea}>
              <div>
               
                <h3>Total Minted</h3>
              </div>
              <div>
                {claimedSupply && unclaimedSupply ? (
                  <p>
                    {/* Claimed supply so far */}
                    <b>{claimedSupply?.toNumber()}</b>
                    {' / '}
                    {
                      // Add unclaimed and claimed supply to get the total supply
                      claimedSupply?.toNumber() + unclaimedSupply?.toNumber()
                    }
                  </p>
                ) : (
                  // Show loading state if we're still loading the supply
                  <p>Loading...</p>
                )}
              </div>
            </div>
  
            {/* Show claim button or connect wallet button */}
            {address ? (
              // Sold out or show the claim button
              isSoldOut ? (
                <div>
                  <h2>Sold Out</h2>
                </div>
              ) : isNotReady ? (
                <div>
                  <h2>Not ready to be minted yet</h2>
                </div>
              ) :networkMismatch ? (
                <button className={styles2.unStakeButton} onClick={switchtoAva}>Switch Network</button>
                
              ): (
                
                <>
                   <h3>Quantity</h3>
                  <div className={styles.quantityContainer}>
                    <button
                      className={`${styles.quantityControlButton}`}
                      onClick={() => setQuantity(quantity - 1)}
                      disabled={quantity <= 1 }
                    >
                      -
                    </button>
  
                    <h2>{quantity}</h2>
  
                    <button
                      className={`${styles.quantityControlButton}`}
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={
                        quantity >=2
                        // parseInt(
                        //   activeClaimCondition?.quantityLimitPerTransaction ||
                        //     '0',
                        // )
                      }
                    >
                      +
                    </button>
                  </div>
  
                  <button
                    className={`${styles.mintButton} ${styles.spacerTop} ${styles.spacerBottom}`}
                    onClick={mint}
                    disabled={claimNFT.isLoading}
                  >
                    {claimNFT.isLoading
                      ? 'Minting...'
                      : `Mint${quantity > 1 ? ` ${quantity}` : ''}${
                          activeClaimCondition?.price.eq(0)
                            ? ' (Free)'
                            : activeClaimCondition?.currencyMetadata.displayValue
                            ? ` (${formatUnits(
                                priceToMint,
                                activeClaimCondition.currencyMetadata.decimals,
                              )} ${
                                activeClaimCondition?.currencyMetadata.symbol
                              })`
                            : ''
                        }`}
                  </button>
                </>
              )
            ) : (
              <div className={styles.buttons}>
                <button
                  className={styles.mainButton}
                  onClick={connectWithMetamask}
                >
                  Connect Wallet
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default Mint;