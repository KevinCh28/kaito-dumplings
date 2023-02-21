import { createContext, FC, useContext, useState } from "react";

interface UserDocument {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  cart: [],
  orders: [],
}

export interface UserContext {
  user?: UserDocument
  setUser?: (user: UserDocument) => void
}

export const UserContextImpl = createContext<UserContext>(null!);

export function userUser() {
  return useContext(UserContextImpl);
}

interface Props {
  initialUser?: UserDocument
}

export const UserProvider: FC<Props> = ({ children, initialUser }) => {
  const [user, setUser] = useState(initialUser);
  return <UserContextImpl.Provider value={{ user, setUser }}>{children}</UserContextImpl.Provider>;
};