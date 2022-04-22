import { Col, Row, Container } from "react-bootstrap";
import {send_with_fee} from './solana';
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { FEE_PAYER_KEYPAIR } from "./config";


const TransactionUI = function() {
    const walletAddress:any = useWallet().publicKey?.toString(); 
    

    const [inputs, setInputs] = useState<any>({});
    const handleChange = (event: { target: { name: any; value: any; }; }) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values: any) => ({ ...values, [name]: value }));
        };



    return(
        <Container>
            <div className=" wrapper shadow mt-5 p-5 col-lg-6 rounded">
                <Row>
                    <Col>
                        <h2 className="Send p-1 TextLabels shadow">Send/Pay Encanto</h2>    
                    </Col>
                    <Col className="mt-4">
                        <input onChange={handleChange} value={inputs.sendToAddress} name="sendToAddress"  className="enter1 mb-2 p-2 col-12 rounded" placeholder="Send to: "></input>
                        <input onChange={handleChange} value={inputs.amountToSend} name="amountToSend" type="Number" className="enter1 p-2 col-12 rounded" placeholder="Amount to send"></input>    
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="shadow p-2 mt-4 sm-invisible">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id, explicabo totam itaque laudantium sit aspernatur molestiae? Fugit, temporibus sed dolorum voluptatum iure magnam ex doloribus provident similique reprehenderit veritatis/</p> 
                         
                    </Col>
                    <Col>
                        <button onClick={() => send_with_fee(walletAddress, inputs.sendToAddress, inputs.amountToSend, FEE_PAYER_KEYPAIR)} className="button rounded mt-4 mb-4">Send</button>
                    </Col>
                </Row>
            </div>
           
        </Container>
    )

}

export default TransactionUI;