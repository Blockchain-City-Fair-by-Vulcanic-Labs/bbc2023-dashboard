// "use client";
// import { setMaxListeners } from "events";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
//
// import { useUser } from "../user";
//
// type User = {
//   address: string;
//   key: string;
//   phrase: string;
// };
//
// function Body() {
//   const [user, setUser] = useState<User>({ address: "", key: "", phrase: "" });
//
//   const router = useRouter();
//   const { tokenId, wallet, signOut } = useUser();
//
//   const handleAttach = (result: any, error: any) => {
//     if (result) {
//       console.log(result.text);
//     }
//   };
//
//   const handleSignOut = () => {
//     signOut();
//     router.push("/");
//   };
//
//   return (
//     <main>
//       <h1>{`Token #${tokenId}`}</h1>
//       <h2>{wallet.address.slice(0, 6) + "..." + wallet.address.slice(-4)}</h2>
//       <button onClick={handleSignOut}>Sign Out</button>
//       <img src="/assets/roofing.png" alt="Dashboard" />
//       <img
//         className="max-w-[80%]"
//         src="/assets/led-dashboard.png"
//         alt="Dashboard"
//       />
//       <h1>Scan your paper wallet to get started</h1>
//       <img src="/assets/bottoming.png" alt="Dashboard" />
//     </main>
//   );
// }
//
// export { Body };
export {};
