import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";




  


function MintAndBalance () {
  const [Account, SetAccount] = useState<any>(null)
  
 
  //  const MY_WALLET_ADDRESS = "55DwoQzQSVvkXdGwKqz7yfwqLxf81rm4GTrUau8EVU9K";

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    
    
    
    async function Data() {
      try{
        const wallet = useWallet().publicKey?.toString(); //TODO it doesn't pull the public key
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
 


    /*
      },[])
{Account.map((account:any)=>(
      <div>
      <h1>Token mint Address: {account.account.data["parsed"]["info"]["mint"]}</h1>
      <h1>Your Token Balance is: {account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"]}</h1>
      </div>
    ))
    
  }
  */
    


     return(

      <div style={{color: "white"}}>
        <br />
        Token mint Address: {Account ? Account[0].account.data.parsed.info.mint : 'connect wallet'}
        <br />
        Your Token Balance is: {Account ? Account[0].account.data.parsed.info.tokenAmount.uiAmount : 'connect wallet'}
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
