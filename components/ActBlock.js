import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { getCookie } from "@/utils/cookies";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ActBlock({ title, id, category }) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendDeleteItem = ({ id, category }) => {
    const config = {
      headers: {
        auth: getCookie("token"),
      },
    };
    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_HOST}api/delete_item`,
          {
            id,
            category,
          },
          config
        )
        .then(() => {
          handleClose();
          router.push(
            router.query.category
              ? `/${router.query.category}/${router.query.subcategory}`
              : "/duplicates"
          );
        });
    } catch (error) {
      console.log(error);
      handleClose();
    }
  };
  return (
    <>
      <div
        style={{
          margin: "auto",
          width: "600px",
          marginBottom: "5px",
          marginTop: "5px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button variant={"outlined"} color={"error"} onClick={handleClickOpen}>
          Удалить
        </Button>
        {/* <Link href={link}> */}
        <Link href={`/edit/${id}`}>
          <Button variant={"outlined"}>Редактировать</Button>
        </Link>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Вы хотите удалить ${title}`}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => sendDeleteItem({ id, category })}
            color={"error"}
          >
            Удалить
          </Button>
          <Button onClick={handleClose} autoFocus>
            Отменить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
