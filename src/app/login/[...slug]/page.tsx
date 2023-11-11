"use client";
import { setMaxListeners } from "events";
import Image from "next/image";
import { Inter, Rye } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";

import {
  Button,
  getImageLink,
  integerToBoolArray,
} from "../../../modules/shared";

import { useAvatar } from "@/modules/onchain";

const assets = require("assets.json");

const inter = Inter({ weight: "400", subsets: ["latin"] });
const rye = Rye({ weight: "400", subsets: ["latin"] });

/*
 * ----- CONVENTION -----
 *
 * goodie[0] =    1 (the least significant bit)
 * goodie[1] =   10
 * goodie[2] =  100
 * goodie[3] = 1000
 */

const MAX_GOODIE_COUNT = assets.booths.length;

const SUPPORT_LINK =
  "http://m.me/61551765092292?text=Hey,%20can%20you%20help%20me";

export default function Page({ params }: { params: { slug: string[] } }) {
  // variables
  const { slug } = params;
  const [tokenId, address, privateKey, equipped] = slug;

  // states
  // inventory = tracker for equipped goodies
  const [inventory, setInventory] = useState<boolean[]>(
    integerToBoolArray(Number(equipped), MAX_GOODIE_COUNT),
  );

  // hooks
  const router = useRouter();
  const { getGoodies, goodies, error, diagnostic } = useAvatar();

  useEffect(() => {
    // on mount

    // load data from chain
    (async () => {
      // Update goodies
      await getGoodies(Number(tokenId), MAX_GOODIE_COUNT);

      console.log("goodies", goodies);
      console.log("inventory", inventory);

      if (error) {
        console.error(diagnostic);
      }
    })();
  }, []);

  const addressToClipboard = () => {
    navigator.clipboard.writeText(address);
  };

  const handleClaim = async () => {
    router.push(`/claim/${tokenId}/${address}/${privateKey}`);
  };

  const handleShare = () => {
    router.push(`/share/${tokenId}/${address}/${privateKey}/${equipped}`);
  };

  const handleSignOut = () => {
    router.push("/");
  };

  const handleGetSupport = () => {
    router.push(SUPPORT_LINK);
  };

  const toggleEquip = (idx: number) => {
    console.log("INVENTORY", inventory);

    let result = 0;
    if (inventory[idx]) {
      // remove
      let beforeBits = new Array(idx).fill(1).join("");
      let afterBits = new Array(MAX_GOODIE_COUNT - idx - 1).fill(1).join("");

      let maskString = beforeBits + "0" + afterBits;
      maskString = maskString.split("").reverse().join("");
      console.log("IN REMOVING", maskString, idx);
      const mask = parseInt(maskString, 2);
      console.log("number", mask);
      result = Number(equipped) & mask;
    } else {
      // equip
      result = Number(equipped) | (2 ** idx);
    }
    router.push(`/login/${tokenId}/${address}/${privateKey}/${result}`);
  };

  return (
    <main className="relative w-screen min-h-screen bg-carnival-navy flex flex-col items-center">
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

        {/*AVATAR SECTION*/}
        <div className="w-full relative">
          <div>
            <img
              className="border-8 border-carnival-yellow w-full"
              src={getImageLink(assets.base.cid, assets.base.name)}
              alt="Bicol Avatar"
            />
          </div>

          {inventory.map((isEquipped, idx) => (
            <>
              {isEquipped && (
                <div className="absolute top-0" key={idx}>
                  <img
                    className="border-8 border-carnival-yellow w-full"
                    src={getImageLink(
                      assets.goodies[idx].cid,
                      assets.goodies[idx].name,
                    )}
                    alt="Bicol Avatar"
                  />
                </div>
              )}
            </>
          ))}
        </div>

        {/*INVENTORY SECTION*/}
        <div className="w-full relative">
          <img
            className="w-full"
            src="/assets/banderitas.png"
            alt="Banderitas"
          />
          <h1
            className={
              rye.className +
              " text-xl text-center text-carnival-yellow mt-8 mb-4"
            }
          >
            Inventory
          </h1>

          <div className="grid grid-cols-4 gap-4">
            {assets.goodies.map((e: any, idx: number) => (
              <div className="text-center bg-carnival-yellow p-2" key={idx}>
                {goodies[idx] ? (
                  <>
                    <img
                      src={getImageLink(
                        assets.goodies[idx].cid,
                        assets.goodies[idx].name,
                      )}
                      alt={assets.goodies[idx].name}
                    />
                    <button
                      onClick={() => toggleEquip(idx)}
                      className={
                        inter.className +
                        ` py-1 px-1 ${
                          inventory[idx]
                            ? "bg-carnival-red"
                            : "bg-carnival-green"
                        } text-xs text-white rounded-md mt-2`
                      }
                    >
                      {inventory[idx] ? "X" : "Add"}
                    </button>
                  </>
                ) : (
                  <img
                    className="opacity-50"
                    src={getImageLink(assets.base.cid, assets.base.name)}
                    alt={assets.base.name}
                  />
                )}
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
          <Button text={"Claim"} func={handleClaim} styling="mt-4" />
          <Button text={"Share Avatar"} func={handleShare} styling="mt-4" />
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
