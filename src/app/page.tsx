"use client";
import { Inter, Rye } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useZxing } from "react-zxing";

const rye = Rye({ weight: "400", subsets: ["latin"] });
const inter = Inter({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const [feedback, setFeedback] = useState();

  // TODO: ERROR HANDLING IF WRONG QR IS SCANNED
  const { ref: camRef } = useZxing({
    onDecodeResult(result) {
      const [tokenId, address, privateKey] = result.getText().split(",");

      // check if correct QR is scanned
      router.push(`/login/${tokenId}/${address}/${privateKey}/0`);
    },
  });

  return (
    <main className="w-screen min-h-screen bg-carnival-navy flex flex-col items-center">
      <img src="/assets/roofing.png" alt="Roofing" />

      {/*CONTENT SECTION*/}
      <section className="p-12">
        <img src="/assets/led-signin.png" alt="Dashboard" />

        <div className="bg-carnival-yellow my-16 p-8">
          <video ref={camRef} />
          <p className={inter.className + " mt-4 text-center text-xs"}>
            {feedback}
          </p>
        </div>

        <h1
          className={
            rye.className + " text-carnival-yellow text-xl text-center"
          }
        >
          Scan your Paper Wallet to Sign In
        </h1>
      </section>

      <img src="/assets/bottoming.png" alt="Bottoming" />
    </main>
  );
}
