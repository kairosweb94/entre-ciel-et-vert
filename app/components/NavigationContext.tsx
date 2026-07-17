"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface NavContextType {
  pendingTarget: string | null;
  navigateTo: (target: string) => void;
  clearTarget: () => void;
}

const NavContext = createContext<NavContextType>({
  pendingTarget: null,
  navigateTo: () => {},
  clearTarget: () => {},
});

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [pendingTarget, setPendingTarget] = useState<string | null>(null);
  const navigateTo = useCallback((target: string) => setPendingTarget(target), []);
  const clearTarget = useCallback(() => setPendingTarget(null), []);
  return (
    <NavContext.Provider value={{ pendingTarget, navigateTo, clearTarget }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNavigation = () => useContext(NavContext);
