import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const API_HOST = import.meta.env.VITE_API_HOST;

        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_HOST}/${url}`);
                if (isMounted) {
                    setData(response.data);
                    setIsLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err);
                    setIsLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url]);

    return { data, isLoading, error };
}
