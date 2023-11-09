import { ReactNode } from "react";

type UserContextPropsType = {
  signIn: (address: string, privateKey: string, phrase: string) => void;
  signOut: () => void;
  wallet: WalletType;
};

type UserProviderPropsType = {
  children: ReactNode;
};

type WalletType = {
  address: string;
  privateKey: string;
  phrase: string;
};

export type { UserContextPropsType, UserProviderPropsType, WalletType };
