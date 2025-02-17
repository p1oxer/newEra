// src/ThemeWrapper.js
import React from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark", // Тёмная тема
        primary: {
            main: "#007bff", // Основной цвет
        },
        secondary: {
            main: "#6c757d", // Вторичный цвет
        },
    },
});

const ThemeWrapper = ({ children }) => {
    return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
};

export default ThemeWrapper;