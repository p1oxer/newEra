// src/hooks/useLoading.js
import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";

export default function useLoading() {
    const { showLoader, hideLoader } = useContext(LoadingContext);
    return { showLoader, hideLoader };
}
