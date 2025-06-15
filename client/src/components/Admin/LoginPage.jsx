// src/LoginPage.js
import React from "react";
import { useLogin, useNotify } from "react-admin";
import { Box, Button, TextField } from "@mui/material";

const LoginPage = () => {
    const login = useLogin();
    const notify = useNotify();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email, password }).catch(() =>
            notify("Неправильная почта или пароль", { type: "error" })
        );
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                alignItems: "center",
                justifyContent: "center",
                background: "url(https://source.unsplash.com/random/1600x900)",
                backgroundSize: "cover",
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 300,
                    padding: 4,
                    borderRadius: 1,
                    backgroundColor: "background.paper",
                    boxShadow: 3,
                }}
            >
                <TextField
                    name="email"
                    type="email"
                    label="Почта"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    required
                    fullWidth
                />
                <TextField
                    name="password"
                    type="password"
                    label="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                    fullWidth
                />
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Войти
                </Button>
            </Box>
        </Box>
    );
};

export default LoginPage;
