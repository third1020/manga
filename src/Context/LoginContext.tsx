import React, { useRef, useState, useEffect, createContext } from "react";
import { getDataUser } from "../../store_data";
export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [login, setlogin] = useState(false);

  return (
    <LoginContext.Provider value={[login, setlogin]}>
      {props.children}
    </LoginContext.Provider>
  );
};
