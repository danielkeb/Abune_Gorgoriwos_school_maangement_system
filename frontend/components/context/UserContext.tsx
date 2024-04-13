'use client'

import { createContext, useContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";

export const AppContext = createContext({});

export function AppWrapper({ children }: { children: React.ReactNode }) {

  const router = useRouter()
  const [token, setToken] = useState<string | null>(() => {

     
    if (typeof window !== 'undefined') {
     
      return localStorage.getItem('authToken') || "";
    }
    return null;
  });

  

  const [decodedToken, setDecodedToken] = useState<{ [key: string]: any } | null>(() => {
    try {
      if (token) {
         return jwt.decode(token);
      
      }
      return null
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  });

  // useEffect(() => {
  //   if (token) {
  //     try {
  //       const decoded = token
  //      // console.log(decoded)
  //       setDecodedToken(decoded);
  //       cookies.set('authCookie', token)
  //     } catch (error) {
  //       console.error('Error decoding token:', error);
  //     }
  //   }
  // }, [token]);

  const logout = () => {
    setToken(null);
    setDecodedToken(null);
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken',"");
     router.push('/login')
    }
  };

  return (
    <AppContext.Provider  value={{token, setToken, logout, decodedToken,setDecodedToken}}>
      {children}
    </AppContext.Provider>
  );
}