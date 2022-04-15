import { Col, Row, Container } from "react-bootstrap";
const TransactionUI = function() {
    return(
        <Container>
            <div className=" wrapper shadow mt-5 p-5 col-lg-6 rounded">
                <Row>
                    <Col>
                        <h2 className="Send p-1 TextLabels shadow">Swap/change "Token Name"  for "This other Token"</h2>    
                    </Col>
                    <Col className="mt-4">
                        <input className="enter1 mb-2 p-2 col-12 rounded" placeholder="Send to: "></input>
                        <input type="Number"className="enter1 p-2 col-12 rounded" placeholder="Amount to send"></input>    
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="shadow p-2 mt-4 sm-invisible">Aquí una breve explicación acerca de este UI para hacer swaps y tal vez el valor de la moneda respecto al dólar.</p> 
                         
                    </Col>
                    <Col>
                        <button className="button rounded mt-4 mb-4">Exchange</button>
                    </Col>
                </Row>
            </div>
           
        </Container>
    )

}

export default TransactionUI;