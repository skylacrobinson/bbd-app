import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { Response, useGetData } from "../hooks-utils/useGetData";


/**
 * AppContext provides a way to share state across the application.
 * It includes the data, current tile index, current tile data, current collection index, and current collection data.
 * This context is used to manage the state of the application and provide it to components that need it.
 */

interface AppContextType {
    data:Response|undefined;
    currentTileIndex: number;
    setCurrentTileIndex: Dispatch<SetStateAction<number>>;
    currentTileData: any;
    setCurrentTileData: Dispatch<SetStateAction<any>>;
    currentCollectionIndex: number;
    setCurrentCollectionIndex: Dispatch<SetStateAction<number>>;
    currentCollectionData: any;
    setCurrentCollectionData: Dispatch<SetStateAction<any>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [currentTileIndex, setCurrentTileIndex] = useState<number>(0);
    const [currentTileData, setCurrentTileData] = useState<any>(null);
    const [currentCollectionIndex, setCurrentCollectionIndex] = useState<number>(0);
    const [currentCollectionData, setCurrentCollectionData] = useState<any>(null);
    const data=useGetData().data
    return (
        <AppContext.Provider
            value={{
                data,
                currentTileIndex,
                setCurrentTileIndex,
                currentTileData,
                setCurrentTileData,
                currentCollectionIndex,
                setCurrentCollectionIndex,
                currentCollectionData,
                setCurrentCollectionData,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};