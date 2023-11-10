import type { Metadata } from "next";
import { App } from "../modules/app";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Blockchain City Fair",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <App>{children}</App>
    </html>
  );
}
