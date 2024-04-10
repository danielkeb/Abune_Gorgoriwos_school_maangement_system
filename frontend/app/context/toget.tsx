"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const ToGetContext = createContext({});

export function AppGetter({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [dork, setDork] = useState("Goood");

  return (
    <ToGetContext.Provider value={{ dork, setDork }}>
      {children}
    </ToGetContext.Provider>
  );
}

export function useAppContext() {
  return useContext(ToGetContext);
}
