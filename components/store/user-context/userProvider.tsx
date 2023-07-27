import { useReducer } from "react";
import { Action } from "../context-types";
import UserContext from "./user-context";
import React from "react";

const defaultUserState = {
  id: "",
  name: "",
  email: "",
};

const userReducer = (
  state: typeof defaultUserState,
  action: Action<string>
): typeof defaultUserState => {
  if (action.type === "UPDATE_ID") {
    return {
      ...state,
      id: action.data,
    };
  } else if (action.type === "UPDATE_NAME") {
    return {
      ...state,
      name: action.data,
    };
  } else if (action.type === "UPDATE_EMAIL") {
    return {
      ...state,
      email: action.data,
    };
  }
  return defaultUserState;
};

type Props = {
  children?: React.ReactNode;
};

const UserProvider = ({ children }: Props): React.ReactNode => {
  const [userState, dispatchUser] = useReducer(userReducer, defaultUserState);

  const updateIdHandler = (id: string) => {
    dispatchUser({
      type: "UPDATE_ID",
      data: id,
    });
  };

  const updateNameHandler = (name: string) => {
    dispatchUser({
      type: "UPDATE_NAME",
      data: name,
    });
  };

  const updateEmailHandler = (email: string) => {
    dispatchUser({
      type: "UPDATE_EMAIL",
      data: email,
    });
  };

  const userContext = {
    id: userState.id,
    name: userState.name,
    email: userState.email,
    updateId: updateIdHandler,
    updateName: updateNameHandler,
    updateEmail: updateEmailHandler,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
