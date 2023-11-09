"use client";
import { setMaxListeners } from "events";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";

import { useUser, WalletType } from "../modules/user";

export default function Home() {
  const [user, setUser] = useState<WalletType>({
    address: "",
    privateKey: "",
    phrase: "",
  });

  const router = useRouter();
  const { signIn } = useUser();

  const handleSignIn = (result: any, error: any) => {
    if (result) {
      const [address, privateKey, phrase] = result.text.split(",");
      signIn(address, privateKey, phrase);
      router.push("/login");
    }
  };

  return (
    <main>
      <h1>Scan your paper wallet to get started</h1>
      <QrReader
        onResult={handleSignIn}
        constraints={{ facingMode: "environment" }}
      />
    </main>
  );
}
