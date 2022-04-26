import { Col, Row, Container } from "react-bootstrap";
import {send_with_fee} from './solana';
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { send_token_v3 } from "./feeLessSender";
import { FEE_PAYER_KEYPAIR, CONNECTION, TOKEN_MINT_PUBKEY } from "./config"; 
import {  PublicKey } from "@solana/web3.js";


const TransactionUI = function() {
    //const walletAddress:any = useWallet().publicKey?.toString(); 
    const wallet=useWallet();
    

    const [inputs, setInputs] = useState<any>({});
    const [log, setLog] = useState<any>(null)

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values: any) => ({ ...values, [name]: value }));
        };

        const HandleSubmit = async (event: any) => {
            event.preventDefault();

            try{
                setLog("Sending please wait...(do not press send twice)")

                const signature = await send_token_v3(
                    FEE_PAYER_KEYPAIR, //sender keypair
                    new PublicKey(inputs.sendToAddress), //PublicKey of receiver
                    inputs.amountToSend, //amount of tokens to send
                    TOKEN_MINT_PUBKEY, //mint address publickey for token
                    CONNECTION, //Connection
                    wallet,
                    true //boolean - whether to mint receiver token account
                    )
            
            
                //if(wallet.signAllTransactions) wallet.signAllTransactions([transaction])
                //const signature = await wallet.sendTransaction(transaction, CONNECTION)
                let message='Transaction ID: '+signature;
                setLog(message)
                

            } catch(e){
                setLog(e)
            }
        }


    return(
        <Container>
            <div className=" wrapper shadow mt-5 p-5 col-lg-6 rounded">
                <Row>
                    <Col>
                        <h2 className="Send p-1 TextLabels shadow">Send/Pay Encanto</h2>    
                    </Col>
                    <Col className="mt-4">
                        <input onChange={handleChange} defaultValue={inputs.sendToAddress} name="sendToAddress"  className="enter1 mb-2 p-2 col-12 rounded" placeholder="Send to: "></input>
                        <input onChange={handleChange} defaultValue={inputs.amountToSend} name="amountToSend" type="Number" className="enter1 p-2 col-12 rounded" placeholder="Amount to send"></input>    
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="shadow p-2 mt-4 sm-invisible">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id, explicabo totam itaque laudantium sit aspernatur molestiae? Fugit, temporibus sed dolorum voluptatum iure magnam ex doloribus provident similique reprehenderit veritatis/</p>
                        <p />
                        <br />

                        {log}
                         
                    </Col>
                    <Col>
                        <button className="button rounded mt-4 mb-4" onClick={HandleSubmit}>Send</button>
                    </Col>
                </Row>
            </div>
           
        </Container>
    )

}

export default TransactionUI;