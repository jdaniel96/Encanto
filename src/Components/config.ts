import {Connection, PublicKey} from '@solana/web3.js';


export const TOKEN_FEE= .01;
export const TOKEN_MINT_PUBKEY = new PublicKey('5R8Ai4pQuzteR1Y5HxpscQH4Es2JNWcQZbMmu9RpZwoR');

//below line currently not working....
export const FEE_PAYER_KEYPAIR:any='2HteubXHr4RA7aZFKfdSbqL9RHcaP26wySz1SJ5FcRmYj93eYZ5EnWCMLXyAv3HbXKbLELSLAknVUVThgWXK6Bkq';
export const CONNECTION = new Connection('https://solana-api.projectserum.com', 'confirmed');
