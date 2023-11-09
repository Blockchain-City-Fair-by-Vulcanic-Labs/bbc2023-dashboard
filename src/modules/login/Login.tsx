"use client";
import { setMaxListeners } from "events";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";

import { useUser } from "../user";

type User = {
  address: string;
  key: string;
  phrase: string;
};

function Body() {
  const [scanning, setScanning] = useState(false);
  const [user, setUser] = useState<User>({ address: "", key: "", phrase: "" });

  const router = useRouter();
  const { wallet, signOut } = useUser();

  const handleAttach = (result: any, error: any) => {
    if (result) {
      console.log(result.text);
    }
  };

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  const toggleScanning = () => {
    setScanning((prev) => !prev);
  };

  useEffect(() => {
    // on mount
    if (wallet.address.length == 0) {
      router.push("/");
    }
  }, []);

  return (
    <main>
      <h1>login</h1>
      <div>{wallet.address}</div>
      <button onClick={handleSignOut}>Sign Out</button>
    </main>
  );
}

export { Body };
