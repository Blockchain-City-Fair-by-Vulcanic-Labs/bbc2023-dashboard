"use client";
import { setMaxListeners } from "events";
import Image from "next/image";
import { Rye } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useZxing } from "react-zxing";

const rye = Rye({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState({
    tokenId: 0,
    address: "",
    privateKey: "",
    phrase: "",
  });

  const { ref: camRef } = useZxing({
    onDecodeResult(result) {
      const [tokenId, address, privateKey, phrase] = result
        .getText()
        .split(",");

      setData({
        tokenId: Number(tokenId),
        address,
        privateKey,
        phrase,
      });
    },
  });

  return (
    <main className="w-screen min-h-screen flex flex-col items-center">
      {/*CONTENT SECTION*/}
      <video ref={camRef} />

      <h1 className="font-bold text-center">{data.tokenId}</h1>
      <p className="text-center">tokenId</p>

      <h1 className="font-bold text-center">{data.address}</h1>
      <p className="text-center">address</p>

      <h1 className="font-bold text-center">{data.privateKey}</h1>
      <p className="text-center">privateKey</p>

      <h1 className="font-bold text-center">{data.phrase}</h1>
      <p className="text-center">phrase</p>
    </main>
  );
}
