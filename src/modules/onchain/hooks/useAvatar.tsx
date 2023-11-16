import { useEffect, useState } from "react";
import { ethers } from "ethers";

import { integerToBoolArray } from "@/modules/shared";

const ABI = require("/Avatar.json").abi;
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "";
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

export default function useAvatar() {
  const [goodies, setGoodies] = useState<boolean[]>([]);
  const [error, setError] = useState(false);
  const [diagnostic, setDiagnostic] = useState<any>();
  const [claiming, setClaiming] = useState(false);

  /*
   * @dev claims a goodie updates attachments
   */
  const claim = async (
    tokenId: number,
    privateKey: string,
    bitwiseOrMask: number,
  ): Promise<string> => {
    setClaiming(true);

    console.log("contract address", CONTRACT_ADDRESS);
    try {
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const signer = new ethers.Wallet(privateKey, provider);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      // update attachments
      const tx = await contract.claim(tokenId, bitwiseOrMask);
      // get attachments
      const result = Number(await contract.attachments(tokenId));
      // update goodies
      setGoodies(integerToBoolArray(result, length));
      console.log("Transaction:", tx);
      return tx;
    } catch (err) {
      setError(true);
      setDiagnostic(err);
      return "";
    }

    setClaiming(false);
  };

  /*
   * @dev retrieves the claimed attachments of a certain tokenId
   */
  const getGoodies = async (tokenId: number, length: number) => {
    try {
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const result = Number(await contract.attachments(tokenId));
      setGoodies(integerToBoolArray(result, length));
    } catch (err) {
      setError(true);
      setDiagnostic(err);
      setGoodies([]);
    }
  };

  const hasMinted = async (address: string, tokenId: number) => {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    try {
      const response = await contract.ownerOf(tokenId);
      return response == address;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return { claim, getGoodies, hasMinted, claiming, goodies, error, diagnostic };
}
