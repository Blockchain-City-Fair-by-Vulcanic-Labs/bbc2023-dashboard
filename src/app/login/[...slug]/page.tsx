"use client";
import { setMaxListeners } from "events";
import Image from "next/image";
import { Inter, Rye } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

import { Button } from "../../../modules/shared";
import { useAvatar } from "@/modules/onchain";

const assets = require("assets.json");

const inter = Inter({ weight: "400", subsets: ["latin"] });
const rye = Rye({ weight: "400", subsets: ["latin"] });

function getImageLink(cid: string, name: string): string {
  return `https://${cid}.ipfs.w3s.link/${name}`;
}

const SUPPORT_LINK =
  "http://m.me/61551765092292?text=Hey,%20can%20you%20help%20me";

export default function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const [tokenId, address, privateKey] = slug;

  const [goodies, setGoodies] = useState();

  const router = useRouter();

  const { getGoodies, error } = useAvatar();

  useEffect(() => {
    // on mount
    (async () => {
      // Goodies
      let g = await getGoodies(Number(tokenId));
      if (!error) {
      }
      console.log("goodies", g);
    })();
  }, []);

  const handleSignOut = () => {
    router.push("/");
  };

  const handleGetSupport = () => {
    router.push(SUPPORT_LINK);
  };

  const addressToClipboard = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <main className="w-screen min-h-screen bg-carnival-navy flex flex-col items-center">
      <header className="w-screen flex flex-col items-center">
        <img src="/assets/roofing.png" alt="Dashboard" />
        <img
          className="max-w-[80%] mt-8"
          src="/assets/led-dashboard.png"
          alt="Dashboard"
        />
      </header>

      {/*CONTENT SECTION*/}
      <section className="p-12">
        <h1
          className={
            rye.className + " text-3xl text-center text-carnival-yellow mb-4"
          }
        >
          {`Bicol Avatar #${tokenId}`}
        </h1>

        <span
          className={
            inter.className +
            " bg-carnival-green p-2 rounded-md flex items-center justify-center mb-4"
          }
        >
          <h2 className={"text-lg text-center text-carnival-white mr-2"}>
            {`${address.slice(0, 6)}...${address.slice(-4)}`}
          </h2>
          <button
            className="text-carnival-yellow text-xs"
            onClick={addressToClipboard}
          >
            Copy
          </button>
        </span>

        <img
          className="border-8 border-carnival-yellow"
          src={getImageLink(assets.base.cid, assets.base.name)}
          alt="Bicol Avatar"
        />

        {/*INVENTORY SECTION*/}
        <div>
          <h1
            className={
              rye.className + " text-xl text-center text-carnival-yellow mt-8"
            }
          >
            Inventory
          </h1>
          <p
            className={
              inter.className + " text-sm text-center text-carnival-white mb-4"
            }
          >
            Tap to equip Digital Goodie
          </p>
          <div className="grid grid-cols-4 gap-4">
            {assets.goodies.map((e, idx) => (
              <div className="text-center bg-carnival-yellow" key={idx}>
                {idx}
              </div>
            ))}
          </div>
        </div>

        {/*BUTTONS SECTION*/}
        <div>
          <h1
            className={
              rye.className + " text-xl text-center text-carnival-yellow mt-8"
            }
          >
            Functions
          </h1>
          <p
            className={
              inter.className + " text-sm text-center text-carnival-white mb-4"
            }
          >
            Claim, Share, or Get Help!
          </p>
          <Button
            text={"Claim"}
            func={() => console.log("CLAIMING")}
            styling="mt-4"
          />
          <Button
            text={"Share Avatar"}
            func={() => console.log("SHARING AVATAR")}
            styling="mt-4"
          />
          <Button text={"Get Support"} func={handleGetSupport} styling="mt-4" />
          <Button text={"Sign Out"} func={handleSignOut} styling="mt-4" />
        </div>
      </section>

      <footer className="w-screen flex flex-col items-center">
        <p
          className={
            rye.className + " text-carnival-yellow text-sm text-center"
          }
        >
          Tech Powered By
        </p>
        <img
          className="my-4 px-16"
          src="/assets/vl-vertical-logo.png"
          alt="Vulcanic Labs"
        />
        <img src="/assets/bottoming.png" alt="Dashboard" />
      </footer>
    </main>
  );
  // return <Body />;
}
