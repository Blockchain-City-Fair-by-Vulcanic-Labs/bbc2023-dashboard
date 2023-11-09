import { ReactNode, useState } from "react";
import {
  UserProviderPropsType,
  UserContextPropsType,
  WalletType,
} from "../types";
import UserContext from "../context";

const UserProvider: React.FC<{ children: ReactNode }> = (props) => {
  // allows extraction of config from props
  const { children, ...config } = props;

  const [tokenId, setTokenId] = useState<number>(0);

  const [wallet, setWallet] = useState<WalletType>({
    address: "",
    privateKey: "",
    phrase: "",
  });

  const signIn = (
    tokenId: number,
    address: string,
    privateKey: string,
    phrase: string,
  ) => {
    setTokenId(tokenId);
    setWallet({ address, privateKey, phrase });
  };

  const signOut = () => {
    setTokenId(0);
    setWallet({
      address: "",
      privateKey: "",
      phrase: "",
    });
  };

  const value: UserContextPropsType = {
    tokenId,
    signIn,
    signOut,
    wallet,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
