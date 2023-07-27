import React from "react"

type UserContextState = {
    id: string,
    name: string,
    email: string,
    updateId: (_:string) => void,
    updateName: (_:string) => void,
    updateEmail: (_:string) => void
}

const UserContext  = React.createContext<UserContextState>({
    id: "",
    name: "",
    email: "",
    updateId: (_:string) => {},
    updateName: (_:string) => {},
    updateEmail: (_:string) => {}
})
export default UserContext;