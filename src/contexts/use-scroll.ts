import { createContext, useContext } from "react";

type ScrollContextType = {
    setScrollDirection: React.Dispatch<React.SetStateAction<'up' | 'down' | null>>;
    setScrollY?: (y: number) => void;
  };
  
export const ScrollContext = createContext<ScrollContextType>({
    setScrollDirection: () => {},
    setScrollY: () => {},
  });

export const useScrollContext = () => {
    return useContext(ScrollContext);
};

