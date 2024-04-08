import { useContext } from "react";
import { TLoaderContextType } from "../interfaces";

import { FC, ReactNode, createContext, useState } from "react";

const LoaderContext = createContext<TLoaderContextType | unknown>({});

interface ContextProps {
    children: ReactNode;
}

const LoadingProvider: FC<ContextProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoaderContext.Provider>
    );
};


const useLoader = () => useContext(LoaderContext) as TLoaderContextType;

export default useLoader;
export { LoadingProvider };