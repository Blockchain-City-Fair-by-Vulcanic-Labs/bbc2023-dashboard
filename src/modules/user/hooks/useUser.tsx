// hooks
import { useContext, useEffect, useState } from "react";
// components
import { UserContextPropsType } from "../types";
import UserContext from "../context";

export default function useUser() {
  const { signIn, signOut, wallet } = useContext(UserContext);

  const user: UserContextPropsType = {
    signIn,
    signOut,
    wallet,
  };

  return user;
}
