"use client";
import { setMaxListeners } from "events";
import Image from "next/image";
import { Inter, Rye } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useZxing } from "react-zxing";
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
const DEFAULT_BOOTH_DATA = { id: 0, booth: "", code: 0 };
const SUPPORT_LINK =
  "http://m.me/61551765092292?text=Hey,%20can%20you%20help%20me";

export default function Page({ params }: { params: { slug: string[] } }) {
  // variables
  const { slug } = params;
  const [tokenId, address, privateKey, equipped] = slug;

  const [data, setData] = useState(DEFAULT_BOOTH_DATA);
  const [found, setFound] = useState(false);

  // states
  const [downloading, setDownloading] = useState(false);
  // inventory = tracker for equipped goodies
  const [inventory, setInventory] = useState<boolean[]>(
    integerToBoolArray(Number(equipped), MAX_GOODIE_COUNT),
  );

  // hooks
  const router = useRouter();
  const { claim, claiming, error, diagnostic } = useAvatar();

  // TODO: ERROR HANDLING IF WRONG QR IS SCANNED
  const {
    ref: camRef,
    torch: { on, off },
  } = useZxing({
    onDecodeResult(result) {
      const [id, booth, code] = result.getText().split(",");
      setData({ id: Number(id), booth, code: Number(code) });
      setFound(true);
    },
  });

  const handleBack = () => {
    router.back();
  };

  const handleCopy = () => {};

  const handleDownload = () => {
    setDownloading(true);
    console.log("downloading...");
    setDownloading(false);
  };

  return (
    <main className="w-screen min-h-screen bg-carnival-navy flex flex-col items-center">
      <img src="/assets/roofing.png" alt="Roofing" />

      {/*CONTENT SECTION*/}
      <section className="p-12">
        <img className="mb-4" src="/assets/led-share.png" alt="Claim" />

        <h1
          className={rye.className + " text-carnival-white text-md text-center"}
        >
          {`Share your avatar on Facebook and tag Blockchain City Fair!`}
        </h1>

        {/*AVATAR SECTION*/}
        <div className="w-full relative mt-8">
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

        <img
          className="w-full mb-8"
          src="/assets/banderitas.png"
          alt="Banderitas"
        />

        <h1
          className={
            rye.className + " text-carnival-yellow text-md text-center"
          }
        >
          Your Caption!
        </h1>

        <p
          className={
            inter.className +
            " w-full outline-none bg-carnival-navy text-white text-center"
          }
        >
          {`Just got my LIMITED EDITION Bicol Avatar #${tokenId} for FREE from Blockchain City Fair at Bicol Blockchain Conference 2023. #BlockchainCityFair #BBC2023 #BCFxBBC2023 #VulcanicLabs`}
        </p>

        <Button
          disabled={downloading}
          text={downloading ? "Please Wait..." : "Download"}
          func={handleDownload}
          styling="mt-4"
        />
        <Button text={"Go Back"} func={handleBack} styling="mt-4" />
      </section>

      <img src="/assets/bottoming.png" alt="Bottoming" />
    </main>
  );
}
