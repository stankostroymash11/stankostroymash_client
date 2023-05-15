import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function HeaderComponent() {
  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "#000" }}>
            СТАНКОСТРОЙМАШ
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
