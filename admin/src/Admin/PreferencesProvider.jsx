// src/PreferencesProvider.js
import React from "react";
import { PreferencesEditorContextProvider } from "react-admin";

const PreferencesProvider = ({ children }) => {
    return (
        <PreferencesEditorContextProvider>
            {children}
        </PreferencesEditorContextProvider>
    );
};

export default PreferencesProvider;