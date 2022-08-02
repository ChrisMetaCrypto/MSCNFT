import styles from "../../styles/Thirdweb.module.css";
import React from "react";
import { ClientRequest } from "http";

export default function ThirdwebGuideFooter() {
  const url = "https://metaspeedclub.net";
  return (
    <>
      <div className=""
        style={{ 
        
          position: "fixed", bottom: 0, width:"100%",
          height: 70,
          alignItems: "center",
          backgroundColor: " #262936",
          margin: 0,
          paddingLeft:"45%",
          display:"flex",
          
          
        }}
      >
       <a href="https://www.instagram.com/metaspeedcarclub/" target="_blank" rel="noreferrer">
       <img
         
         src={`/instagramnew.png`}
        
         alt="Insta Logo"
         width={50}
         style={{ 
           alignItems: "right",
           margin: "15px"
         }}
       />
       </a>

       <a href="https://discord.com/invite/PPC7XvV6vm"  target="_blank" rel="noreferrer">
          <img
         
         src={`/discordnew.png`}
         alt="Discord Logo"
         width={50}
         style={{ 
           alignItems: "right",
           margin: "15px"
         }}
       />
       </a>

        <a href="https://twitter.com/Metaspeedclubs"  target="_blank" rel="noreferrer">
         <img
         
              src={`/twitternew.png`}
              alt="Twitter Logo"
              width={50}
              style={{ 
                alignItems: "right",
                margin: "15px"
              }}
            />
           </a>
             
        </div>
      
      

    </>
  );
}
