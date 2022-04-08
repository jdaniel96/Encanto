import { Col, Row, Container } from "react-bootstrap";
const TransactionUI = function() {
    return(
        <Container>
            <div className=" wrapper shadow mt-5 p-5 col-lg-6 rounded">
                <Row>
                    <Col>
                        <h2 className="Send p-1 TextLabels shadow">Swap/change "Token Name"  for "This other Token"</h2>    
                    </Col>
                    <Col>
                        <p className="shadow p-1">Aquí una breve explicación acerca de este UI para hacer swaps y tal vez el valor de la moneda respecto al dólar.</p>  
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input className="enter1 mb-2 p-2 col-12" placeholder="Enter the (Token #1)"></input>
                        <input className="enter1 p-2 col-12" placeholder="Enter amount(Token #2)"></input>    
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