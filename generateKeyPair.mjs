import { Keypair } from "@solana/web3.js";
import fs from "fs";

// Generate a new keypair
const keypair = Keypair.generate();

// Save the secret key as an environment variable
fs.writeFileSync(
  ".env",
  `SECRET_KEY=${JSON.stringify(Array.from(keypair.secretKey))}\n`
);

console.log("✅ Keypair generated!");
console.log("Public Key:", keypair.publicKey.toBase58());
