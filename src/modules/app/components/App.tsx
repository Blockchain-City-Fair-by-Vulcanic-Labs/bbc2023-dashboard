"use client";
import { Inter } from "next/font/google";
import { UserProvider } from "../../user";

const inter = Inter({ subsets: ["latin"] });

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <body className={inter.className}>{children}</body>
    </UserProvider>
  );
}
