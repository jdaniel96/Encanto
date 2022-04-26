import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";


function MintAndBalance () {
  const walletAddress = useWallet().publicKey?.toString(); 
  const [Account, SetAccount] = useState<any>(null)

    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
    
    
    
    async function Data() {
      try{
        const wallet = useWallet().publicKey?.toString(); 
        console.log(wallet);
        
        if (wallet){
        const accounts:{[index: string]:any} = await connection.getParsedProgramAccounts(
          
        TOKEN_PROGRAM_ID, // new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
        {
          filters: [
            {
              dataSize: 165, // number of bytes
            },
            {
              memcmp: {
                offset: 32, // number of bytes
                bytes: wallet, // base58 encoded string
              },
            },
          ],
        }
      
      )
      
      SetAccount(accounts)
    }

      }catch(e){
        alert(e)
      }
    }


  if (!Account){
    Data();
  }
 
     return(

      <div style={{color: "white"}}>
        <br />
        Token mint Address: {Account ? Account[0].account.data.parsed.info.mint : 'connect wallet'}
        <br />
        Your Token Balance is: {Account ? Account[0].account.data.parsed.info.tokenAmount.uiAmount : 'connect wallet'}
        <br />
        Your wallet address is: {walletAddress}
      </div>
    )
  
}



export const UI = function(){ //import this component to your app.tsx 

  return(
    <div>
      <MintAndBalance />
    </div>
    
  )
}
