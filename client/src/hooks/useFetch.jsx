import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) {
            // Не делаем запрос, если URL пустой
            return;
        }

        const API_HOST = import.meta.env.VITE_API_HOST;

        let isMounted = true;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${API_HOST}/${url}`);
                if (isMounted) {
                    setData(response.data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err);
                }
            } finally {
                if (isMounted) {
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
