import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "next/link";

export default function SearchDialog({ open, handleClose, result, text }) {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Результат</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              overflowY: "auto",
              maxHeight: "600px",
              width: "300px",
              alignItems: "center",
            }}
          >
            {result
              ? result.map((item) => {
                  if (item?.subCategoryEn) {
                    return (
                      <Link
                        key={item._id}
                        href={`/${item?.categoryEn}/${item.subCategoryEn}/${item?._id}`}
                        style={{ display: "block" }}
                        onClick={handleClose}
                      >
                        <img
                          style={{ width: "200px", height: "auto" }}
                          src={`${process.env.NEXT_PUBLIC_API_HOST}${item.photoPrimary}`}
                          alt={item.title}
                          onClick={handleClose}
                        />
                      </Link>
                    );
                  } else {
                    return (
                      <Link
                        key={item._id}
                        href={`/${item?.categoryEn}/${item?._id}`}
                        style={{ display: "block" }}
                      >
                        <img
                          style={{ width: "200px", height: "auto" }}
                          src={`${process.env.NEXT_PUBLIC_API_HOST}${item.photoPrimary}`}
                          alt={item.title}
                        />
                      </Link>
                    );
                  }
                })
              : `${text} не найден`}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
