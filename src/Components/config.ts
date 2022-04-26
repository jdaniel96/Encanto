import {Connection, PublicKey, Keypair, Signer} from '@solana/web3.js';
import base58 from 'bs58';

export const TOKEN_FEE= .01;
export const TOKEN_MINT_PUBKEY = new PublicKey('3oCpC7wK5EcACMwTMHMNrcWvxvByoSMFu7UtfpRMkQMS');

//below line currently not working....
export const FEE_PAYER_KEYPAIR:any='process.env.REACT_APP_PRIVATE_KEY';

export const CONNECTION = new Connection('https://solana-api.projectserum.com', 'confirmed');
