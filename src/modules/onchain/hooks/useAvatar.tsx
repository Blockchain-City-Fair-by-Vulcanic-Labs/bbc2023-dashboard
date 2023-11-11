import { useEffect, useState } from "react";
import { ethers } from "ethers";

import { integerToBoolArray } from "../../../modules/shared";

// TODO: TEMPORARY ADD IN .ENV VARIABLE
const anvilAbi = require("../../../../Avatar.json").abi;

const ABI = anvilAbi;
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "";
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY || "";
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
  ) => {
    setClaiming(true);

    try {
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const signer = new ethers.Wallet(privateKey, provider);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      // update attachments
      console.log("token id", tokenId);
      console.log("signer addy", signer.address);
      console.log("ownerof", await contract.ownerOf(tokenId));
      await contract.claim(tokenId, bitwiseOrMask);
      // get attachments
      const result = Number(await contract.attachments(tokenId));
      // update goodies
      setGoodies(integerToBoolArray(result, length));
    } catch (err) {
      setError(true);
      setDiagnostic(err);
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

  return { claim, getGoodies, claiming, goodies, error, diagnostic };
}
