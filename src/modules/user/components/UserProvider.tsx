import { useState } from "react";
import {
  UserProviderPropsType,
  UserContextPropsType,
  WalletType,
} from "../types";
import UserContext from "../context";

const UserProvider: React.FC<UserProviderPropsType> = (props) => {
  // allows extraction of config from props
  const { children, ...config } = props;

  const [wallet, setWallet] = useState<WalletType>({
    address: "",
    privateKey: "",
    phrase: "",
  });

  const signIn = (address: string, privateKey: string, phrase: string) => {
    setWallet({ address, privateKey, phrase });
  };

  const signOut = () => {
    setWallet({
      address: "",
      privateKey: "",
      phrase: "",
    });
  };

  const value: UserContextPropsType = {
    signIn,
    signOut,
    wallet,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
