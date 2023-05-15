import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { getCookie, setCookie } from "@/utils/cookies";

export default function Change() {
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [state, setState] = useState(false);

    const handleSubmit = () => {
        axios
            .post(`${process.env.NEXT_PUBLIC_API_HOST}api/change-pass`, {
                oldPassword: oldPassword,
                password: password,
                token: getCookie("token")
            })
            .then(function (response) {
                setCookie("token", response.data.token);
                setState(true)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Сменить пароль
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="old_password"
                        label="Старый Пароль"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="new_password"
                        label="Новый Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirm_password"
                        label="Повторить"
                        type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        error={Boolean(password !== confirm && confirm.length > 0)}
                        helperText={(password !== confirm && confirm.length > 0) ? "Пароли не совпадают" : ""}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                        disabled={!Boolean(oldPassword && password && confirm && password === confirm)}
                    >
                        Сменить
                    </Button>
                </Box>
                {state && <Typography component="h1" variant="h5">
                    Пароль успешно изменён
                </Typography>}
            </Box>
        </Container>
    );
}
