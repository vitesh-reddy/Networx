import { createContext, useState } from "react";

export const UserContext = createContext({
  userData: {
    token: "",
    id: "",
    firstName: "",
    lastName: "",
    userName: "",
    gender: "",
    age: 0,
    email: "",
    locality: "",
    avatar: "",
    role: "",
    interests: [],
  },
  setUserData: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    token: "",
    id: "",
    firstName: "",
    lastName: "",
    userName: "",
    gender: "",
    age: 0,
    email: "",
    locality: "",
    avatar: "",
    role: "",
    interests: [],
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
