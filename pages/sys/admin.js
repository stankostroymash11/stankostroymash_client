import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { getCookie, setCookie } from "@/utils/cookies";
import { useRouter } from "next/router";
import { endpoint } from "@/endpoint";

export default function Admin() {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState()
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    axios
      .post(`${endpoint.url}api/auth`, {
        email: data.get("email"),
        password: data.get("password"),
      })
      .then(function (response) {
        setCookie("token", response.data.token);
        setCookie("user", response.data.user);
        router.reload(window.location.pathname)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (getCookie("token")) {
      router.push("/sys/add");
    }
  }, [])

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
          Войти
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Логин"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setLogin(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!Boolean(login && password)}
          >
            Войти
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
