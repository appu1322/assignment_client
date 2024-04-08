export type TLoaderContextType = {
    isLoading: boolean;
    setIsLoading: (prev: (loader: boolean) => void) => void;
};