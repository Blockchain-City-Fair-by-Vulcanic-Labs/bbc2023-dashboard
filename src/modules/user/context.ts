// types
import type { UserContextPropsType } from "./types";

// helpers
import React from "react";

/*
 * set default context values
 */
const UserContext = React.createContext<UserContextPropsType>({
  tokenId: 0,
  wallet: {
    address: "",
    privateKey: "",
    phrase: "",
  },
  signIn: () => {},
  signOut: () => {},
});

export default UserContext;
