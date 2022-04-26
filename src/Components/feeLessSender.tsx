
import { WalletContextState } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Signer, TransactionInstruction, Transaction, Commitment, Keypair } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, 
    createTransferInstruction,
    getMint, 
    createAssociatedTokenAccount,
    getAssociatedTokenAddress, 
    getAccount
 } from '@solana/spl-token';
 import base58 from 'bs58';

//sleep function
 function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  } 

//gets current slot and blockhash
const getSlotAndCurrentBlockHash = (
    connection: Connection,
    commitment: Commitment,
  ) =>
    Promise.all([
      connection.getSlot(),
      connection.getLatestBlockhash(commitment),
    ]);
  
  
  //function to send a signed transaction.
  async function sendSignedTransaction (
    signedTransaction: Transaction, //Transaction
    connection: Connection, //Connection
    commitment: Commitment, //confirmed
  ) {
      const rawTransaction = signedTransaction.serialize();
      let done=false;
      const startTime=Date.now();
      const timeout=60000; //ms
      console.log('START TIME IS:', startTime)
    
      const txid = await connection.sendRawTransaction(
        rawTransaction, 
         {
           skipPreflight: true,
         },
      );
  
      console.log('TXID: ', txid)
  
      let i=1;
      while (Date.now() - startTime < timeout && !done){
        await sleep(300*i) //using an exponential back-off strategy to retry/recheck sending.
        i++
        
        let tx_status=await connection.getSignatureStatuses([txid]);
        console.log(tx_status)
    
        if (tx_status.value[0]){
          if (tx_status.value[0].confirmationStatus==commitment){
              done=true;
            };
          };
        
        await connection.sendRawTransaction(
          rawTransaction, 
           {
             skipPreflight: true,
           },
          );
        
        console.log('resent tx...finshed: ', done)     
      
      }
  
      if (done){
        return txid;
      } else{
        throw 'transaction timeout'
      }
      
    };
  
  
  //@parm transaction: TransactionInstruction
  //@param signers [...Signer]
  //@param toPubKey: PublicKey
  const signAndSend= async (
      transactionInstruction: TransactionInstruction, 
      wallet: WalletContextState,
      connection: Connection,
      feePayer: Signer
      )=>{
    
    const commitment='confirmed'
  
    let [slot, currentBlock] = await getSlotAndCurrentBlockHash(
        connection, //Connection 
        commitment, //Commitment - processed, confirmed, or max
      );
  
    let transaction=new Transaction({
      recentBlockhash: currentBlock.blockhash,
      feePayer: feePayer.publicKey,
    }).add(transactionInstruction)
  
    console.log('UNSIGNED TX:', transaction)

    if (!wallet.signAllTransactions){
      throw "wallet not connected"
    }

    try{
       
      //sign transaction with fee payer keypair.
      transaction.sign(feePayer)

      //sign transaction with sender wallet
      await wallet.signAllTransactions([transaction])

      console.log('SIGNED TX:', transaction)
    
      //send the transaction
      const txid =await sendSignedTransaction(transaction, connection, commitment);

      return txid
      
    } catch(e){
      alert(e)
      console.log(e)
    }
    
  }
  
  
   export const send_token_v3 = async (
      keypair_string: string, //sender keypair
      to_pubkey: PublicKey, //PublicKey of receiver
      amount: number, //amount of tokens to send
      mint: PublicKey, //mint address publickey for token
      connection: Connection, //Connection 
      wallet: WalletContextState, //wallet
      mintForReceiver: boolean //boolean - whether to mint receiver token account
    ) => {

      if (!wallet.publicKey){
        return "Wallet connection needed to send..."
      }

        const from_keypair=Keypair.fromSecretKey(base58.decode(keypair_string));
      
      try{
        
        //get token account to send from
        const fromTokenAccount_account = await getTokenAccount(wallet.publicKey, connection, mint, from_keypair, false)
        
        //get token account to send to
        const toTokenAccount_account = await getTokenAccount(to_pubkey, connection, mint, from_keypair, mintForReceiver);
            
        //getting number of decimals for token specified
        const decimals = (await getMint(connection, mint)).decimals;

        //building the unsigned token transaction
        const transactionInstruction = createTransferInstruction(
            fromTokenAccount_account, // token account PublicKey of the sender
            toTokenAccount_account, //token account PublicKey of the receiver
            wallet.publicKey, // Token account owner PublicKey (sender public key)
            amount*10**decimals, //update to handle decimals
            [], //multisigners
            TOKEN_PROGRAM_ID, //TOKEN PROGRAM ID FROM @solana/spl-token
          );
  
        //sign and send transaction
        const txid = await signAndSend(transactionInstruction, wallet, connection, from_keypair);
        
        //returns transaction id
        return txid;
  
      }catch(e){
        alert(e)
        throw e
      }
    };
  

  //pubkey: PublicKey
  //connection: Connection
  //mint: PublicKey
  //feePayer: Keypair
  //create: boolean - whether or not to create account if none exists
  const getTokenAccount = async(
      pubKey: PublicKey, 
      connection: Connection, 
      mint: PublicKey, 
      feePayerKeypair: Signer, 
      create: boolean
      ) => {
  
    try{
  
      const tokenAccount=await getAssociatedTokenAddress(mint, pubKey);
  
      await getAccount(connection, tokenAccount)
      
      return tokenAccount;
      
    } catch{
      if (create){
        try{
          const tokenAccount=await createAssociatedTokenAccount(
          connection,
          feePayerKeypair,
          mint,
          pubKey
        );
  
          return tokenAccount
        } catch (e) {
          console.log(e)
          throw 'Timeout or Not enough funds to create token account'
        }
        
      } else {
        throw 'No token account found.'
      }
    }
  }