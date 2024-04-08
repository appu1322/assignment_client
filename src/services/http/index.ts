import useLoader from "../../hooks/useLoader";
import axios, { AxiosError } from "axios";

const HttpService = () => {
    const { setIsLoading } = useLoader();

    const httpRequest = <T>(
        method: "GET" | "POST" | "PUT" | "DELETE" | "OPTION",
        url: string,
        data = {},
        params = {},
    ) => new Promise<T>((resolve, reject) => {
        setIsLoading(() => true);
        axios({
            method,
            url: `${import.meta.env.VITE_BASE_URL}/${url}`,
            data,
            params,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("currentUserToken") || ""}`
            }
        })
            .then((response) => {
                setIsLoading(() => false);
                resolve(response.data);
            })
            .catch((err) => {
                const error = err as AxiosError;
                setIsLoading(() => false);
                if (error.response?.status === 401) {
                    localStorage.removeItem("currentUserToken");
                }
                reject(err.response);
            });
    });

    return { httpRequest };
};

export default HttpService;
