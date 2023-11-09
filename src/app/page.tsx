"use client";
import { setMaxListeners } from "events";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useZxing } from "react-zxing";

import { useUser, WalletType } from "../modules/user";

export default function Home() {
  const [user, setUser] = useState<WalletType>({
    address: "",
    privateKey: "",
    phrase: "",
  });

  const router = useRouter();
  const { signIn } = useUser();

  const { ref: camRef } = useZxing({
    onDecodeResult(result) {
      const [tokenId, address, privateKey, phrase] = result
        .getText()
        .split(",");
      signIn(Number(tokenId), address, privateKey, phrase);
      router.push("/login");
    },
  });

  return (
    <main>
      <h1>Scan your paper wallet to get started</h1>
      <video ref={camRef} />
    </main>
  );
}
