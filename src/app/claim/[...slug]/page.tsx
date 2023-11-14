"use client";
// package imports
import { Inter, Rye } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useZxing } from "react-zxing";
// module imports
import { useAvatar } from "@/modules/onchain";
import { Button } from "@/modules/shared";

// initialization
const assets = require("assets.json");
const inter = Inter({ weight: "400", subsets: ["latin"] });
const rye = Rye({ weight: "400", subsets: ["latin"] });

// constants
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

  const [data, setData] = useState(DEFAULT_BOOTH_DATA);
  const [found, setFound] = useState(false);
  const [feedback, setFeedback] = useState("");

  // hooks
  const router = useRouter();
  const { claim, claiming, error, diagnostic } = useAvatar();

  const {
    ref: camRef,
    torch: { on, off },
  } = useZxing({
    onDecodeResult(result) {
      const [id, booth, code] = result.getText().split(",");

      // check if correct QR is scanned
      if (
        assets.booths[Number(id) - 1].name == booth &&
        assets.booths[Number(id) - 1].code == code
      ) {
        setData({ id: Number(id), booth, code: Number(code) });
        setFound(true);
      } else {
        console.error("Invalid QR for claiming. Use a booth claim QR code.");
        setFeedback("Invalid QR for claiming. Use a booth claim QR code.");
      }
    },
  });

  const handleBack = () => {
    router.back();
  };

  const handleClaim = async (bitwiseOrMask: number) => {
    await claim(Number(tokenId), privateKey, bitwiseOrMask);
    if (error) {
      console.error(diagnostic);
    } else {
      router.push(`/login/${tokenId}/${address}/${privateKey}/${equipped}`);
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

        {found ? (
          <div className="flex flex-col items-center">
            <h1
              className={
                rye.className + " text-carnival-yellow text-xl text-center my-8"
              }
            >
              {data.booth}
            </h1>
            <img
              src={`/assets/icons/${data.id}.png`}
              alt={"Vulcanic Labs Goodie"}
            />
            <Button
              disabled={claiming}
              text={claiming ? "Claiming..." : "Claim"}
              func={() => handleClaim(data.code)}
              styling={`mt-4 ${claiming ? "opacity-50" : "opacity-100"}`}
            />
          </div>
        ) : (
          <div className="bg-carnival-yellow my-16 p-8">
            <video ref={camRef} />
            <p className={inter.className + " mt-4 text-center text-xs"}>
              {feedback}
            </p>
          </div>
        )}

        <Button text={"Go Back"} func={handleBack} styling="mt-4" />
      </section>

      <img src="/assets/bottoming.png" alt="Bottoming" />
    </main>
  );
}
