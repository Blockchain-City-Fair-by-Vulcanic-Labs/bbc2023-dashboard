"use client";
import { setMaxListeners } from "events";
import Image from "next/image";
import { Rye } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "../../../modules/shared";

const assets = require("assets.json");

const rye = Rye({ weight: "400", subsets: ["latin"] });

function getImageLink(cid: string, name: string): string {
  return `https://${cid}.ipfs.w3s.link/${name}`;
}

const SUPPORT_LINK = "http://m.me/61551765092292";

export default function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const [tokenId, address, privateKey] = slug;

  const router = useRouter();

  const handleSignOut = () => {
    router.push("/");
  };

  const handleGetSupport = () => {
    router.push(SUPPORT_LINK);
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

        <img
          className="border-8 border-carnival-yellow"
          src={getImageLink(assets.base.cid, assets.base.name)}
          alt="Bicol Avatar"
        />

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
