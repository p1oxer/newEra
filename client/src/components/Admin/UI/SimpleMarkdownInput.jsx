// src/components/MarkdownInput.js
import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { useController, useFormContext } from "react-hook-form";
import { InputHelperText } from "react-admin";

const MarkdownInput = ({ source, label, defaultValue = "" }) => {
    const { control } = useFormContext();
    const {
        field: { onChange, value },
        fieldState: { invalid, error },
    } = useController({
        name: source,
        control,
        defaultValue,
    });

    return (
        <div style={{ marginBottom: "1rem" }}>
            <label>
                <strong>{label}</strong>
            </label>
            <MDEditor value={value} onChange={(val) => onChange(val)} height={300} width={1500}/>
            <InputHelperText error={error?.message} />
        </div>
    );
};

export default MarkdownInput;
