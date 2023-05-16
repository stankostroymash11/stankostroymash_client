import React, { useCallback, useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import SearchDialog from "./SearchDialog";
import styles from "../../styles/searchComponent.module.css";
import { endpoint } from "@/endpoint";

export default function SearchComponent() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [result, setResult] = useState();

  const handleClickOpen = useCallback(async () => {
    if (text.length) {
      const res = await fetch(
        `${endpoint.url}api/search?search=${text}`
      );
      const data = await res.json().then((res) => res);
      setResult(data.result);
      setOpen(true);
    }
  }, [text]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <TextField
        fullWidth={true}
        id="outlined-size-small"
        defaultValue={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Поиск"
        size="small"
        InputProps={{
          endAdornment: (
            <IconButton
              style={{ marginRight: "-7px" }}
              onClick={handleClickOpen}
              size="small"
            >
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
      <SearchDialog
        open={open}
        handleClose={handleClose}
        result={result}
        text={text}
      />
    </div>
  );
}
