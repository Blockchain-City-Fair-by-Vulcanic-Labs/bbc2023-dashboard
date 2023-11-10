import { useState } from "react";
import { ethers } from "ethers";

// TODO: TEMPORARY ADD IN .ENV VARIABLE
const anvilRpcUrl = "http://127.0.0.1:8545";
const anvilPrivateKey =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const anvilContractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const anvilAbi = require("../../../../Avatar.json").abi;

export default function useAvatar() {
  const [error, setError] = useState(false);
  const [diagnostic, setDiagnostic] = useState("");

  const getGoodies = async (tokenId: number): Promise<number> => {
    try {
      const provider = new ethers.JsonRpcProvider(anvilRpcUrl);
      const contract = new ethers.Contract(
        anvilContractAddress,
        anvilAbi,
        provider,
      );
      let result = Number(await contract.attachments(tokenId));
      return result;
    } catch (err) {
      setError(true);
      setDiagnostic("GetGoodies: Failed to Get Goodies");
      return -1;
    }
  };

  return { getGoodies, error, diagnostic };
}

// const ethers = require("ethers");
// const QRCode = require("qrcode");
//
// // ANVIL_RPC_URL=http://127.0.0.1:8545
// // ANVIL_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
//
// // http://localhost:3000/login/1/0xecdE245cfC5986EB3F763bccaa5A37630Ae6fb65/0x3687afde509da8b21fa907e2978a430275734c3d98778a908393a36343a45863
//
// async function main() {
// 	const anvilRpcUrl = "http://127.0.0.1:8545";
// 	const anvilPrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
// 	const anvilContractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
// 	const anvilAbi = require("../contracts/out/Avatar.sol/Avatar.json").abi;
//
// 	const provider = new ethers.JsonRpcProvider(anvilRpcUrl);
// 	const signer = await provider.getSigner();
// 	const contract = new ethers.Contract(anvilContractAddress, anvilAbi, signer);
//
// 	const walletCount = 5;
//
// 	for (let tokenId = 1; tokenId <= walletCount; tokenId++) {
// 		let wallet = ethers.Wallet.createRandom();
// 		let tx = await contract.mintAndTransfer(wallet.address, tokenId);
// 		console.log(wallet.address, wallet.privateKey);
// 		console.log(await contract.ownerOf(tokenId));
// 		console.log('TOKEN ID', tokenId);
// 		let code = await QRCode.toFile(`./assets/out/${tokenId}.png`, `${tokenId},${wallet.address},${wallet.privateKey},${wallet.mnemonic.phrase}`, {errorCorrectionLevel: "H"});
// 	}
// }
//
// main()
// 	.then(() => process.exit(0))
// 	.catch(err => {
// 		console.error(err);
// 		process.exit(1);
// 	});
//
