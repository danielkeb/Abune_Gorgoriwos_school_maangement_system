"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const ToGetContext = createContext({});

export function AppGetter({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [dork, setDork] = useState("Goood");
  const[schoolId, setSchoolId]= useState("Your school id goes here");

  return (
    <ToGetContext.Provider value={{ dork, setDork, schoolId, setSchoolId }}>
      {children}
    </ToGetContext.Provider>
  );
}

export function useAppContext() {
  return useContext(ToGetContext);
}
