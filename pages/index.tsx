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
import AccordionTile from "../components/AccordionTitle";
import RoadmapData from "../components/RoadmapData"



const Home: NextPage = () => {
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
        <h1 className={styles.h1}>Welcome to Meta Speed Club</h1>
        <video  autoPlay loop width="750" height="600">
       <source src="/introvid.mp4" type="video/mp4"/>
       </video>
        <p className={styles.explain}>
          Stake your MSC Car NFTs to earn $Fuel & $Nitro
        </p>
        <hr className={styles.divider} />
      
        <h1 className={styles.h2}>Roadmap</h1>
        <div className=" flex justify-center items-center">
      <div className="relative  max-w-sm lg:max-w-3xl min-h-[350px] flex flex-col lg:flex-row justify-end items-center
       py-10 px-10 lg:px-16 rounded-2xl bg-violet-700	shadow-2xl modal">
        <main className='w-full lg:w flex flex-col '>
          {RoadmapData.map((item, index )=> {

              return(
                <AccordionTile key={index} question={item.question} answer={item.answer}/>
              )

          })}
      
        </main>


      </div>
    </div>
        </div>
    </>
  );
};

export default Home;
