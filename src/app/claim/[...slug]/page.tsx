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

const DEFAULT_BOOTH_DATA = { id: 0, booth: "", code: 0 };
const SUPPORT_LINK =
  "http://m.me/61551765092292?text=Hey,%20can%20you%20help%20me";

export default function Page({ params }: { params: { slug: string[] } }) {
  // variables
  const { slug } = params;
  const [tokenId, address, privateKey, equipped] = slug;

  const [data, setData] = useState(DEFAULT_BOOTH_DATA);
  const [found, setFound] = useState(false);

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

  const handleClaim = async (bitwiseOrMask: number) => {
    await claim(Number(tokenId), privateKey, bitwiseOrMask);
    if (error) {
      console.error(diagnostic);
    }
  };

  return (
    <main className="w-screen min-h-screen bg-carnival-navy flex flex-col items-center">
      <img src="/assets/roofing.png" alt="Roofing" />

      {/*CONTENT SECTION*/}
      <section className="p-12">
        <img className="mb-4" src="/assets/led-claim.png" alt="Claim" />

        <h1
          className={rye.className + " text-carnival-white text-md text-center"}
        >
          Scan Booth Code to Claim
        </h1>

        {!found && (
          <div className="bg-carnival-yellow my-16 p-8">
            <video ref={camRef} />
          </div>
        )}

        {found && (
          <>
            <h1
              className={
                rye.className + " text-carnival-yellow text-xl text-center my-8"
              }
            >
              {data.booth}
            </h1>
            <img
              src={getImageLink(
                assets.booths[Number(data.id) - 1].cid,
                "base.png",
              )}
              alt={data.booth + " Goodie"}
            />
            <Button
              disabled={claiming}
              text={claiming ? "Claiming..." : "Claim"}
              func={() => handleClaim(data.code)}
              styling={`mt-4 ${claiming ? "opacity-50" : "opacity-100"}`}
            />
          </>
        )}
        <Button text={"Go Back"} func={handleBack} styling="mt-4" />
      </section>

      <img src="/assets/bottoming.png" alt="Bottoming" />
    </main>
  );
}
