"use client";
// package imports
import { Inter, Rye } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useZxing } from "react-zxing";
import mergeImages from "merge-images";
// module imports
import {
  Button,
  getImageLink,
  integerToBoolArray,
} from "../../../modules/shared";
import { useAvatar } from "@/modules/onchain";

// initialization
const assets = require("assets.json");
const inter = Inter({ weight: "400", subsets: ["latin"] });
const rye = Rye({ weight: "400", subsets: ["latin"] });

// constants
const MAX_GOODIE_COUNT = assets.booths.length;
const ASSETS_PATH = "/assets";
const SCALED_SPRITE_PATH = ASSETS_PATH + "/sprite/scaled";
const DEFAULT_BOOTH_DATA = { id: 0, booth: "", code: 0 };

/*
 * ----- CONVENTION -----
 *
 * goodie[0] =    1 (the least significant bit)
 * goodie[1] =   10
 * goodie[2] =  100
 * goodie[3] = 1000
 */
export default function Page({ params }: { params: { slug: string[] } }) {
  // variables
  const { slug } = params;
  const [tokenId, address, privateKey, equipped] = slug;

  // references
  const downloadRef = useRef<HTMLAnchorElement>(null);

  // states
  const [downloading, setDownloading] = useState(false);
  const [data, setData] = useState(DEFAULT_BOOTH_DATA);
  const [mergedAvatar, setMergedAvatar] = useState("");
  const [found, setFound] = useState(false);
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

  const handleDownload = async () => {
    if (downloadRef.current) {
      setDownloading(true);
      downloadRef.current.click();
      setDownloading(false);
    }
  };

  useEffect(() => {
    // on mount
    (async () => {
      try {
        const merging = [
          {
            src: SCALED_SPRITE_PATH + "/avatar-bg.png",
            x: 0,
            y: 0,
          },
          { src: SCALED_SPRITE_PATH + "/base.png", x: 1700, y: 1950 },
        ];
        inventory.forEach((m, idx) => {
          if (m) {
            merging.push({
              src: SCALED_SPRITE_PATH + `/${idx + 1}.png`,
              x: 1700,
              y: 1950,
            });
          }
        });

        const img = await mergeImages(merging);
        setMergedAvatar(img);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

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
          <img
            className="border-8 border-carnival-yellow w-full bg-carnival-yellow"
            src={mergedAvatar}
            alt="Your Bicol Avatar"
          />
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

        {mergedAvatar.length != 0 && (
          <>
            <a download ref={downloadRef} href={mergedAvatar} />
            <Button
              disabled={downloading}
              text={downloading ? "Please Wait..." : "Download"}
              func={handleDownload}
              styling="mt-4"
            />
          </>
        )}
        <Button text={"Go Back"} func={handleBack} styling="mt-4" />
      </section>

      <img src="/assets/bottoming.png" alt="Bottoming" />
    </main>
  );
}
