"use client"
import { User } from "firebase/auth";
import React from "react";

const FirebaseAuthContext = React.createContext<User | null>(null)

export default FirebaseAuthContext;