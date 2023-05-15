import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import React from "react";
import Link from "next/link";

export default function SubCategoryListBlock({ images, name, parent }) {
  return (
    <Paper style={{ width: "80%", minHeight: "350px" }} elevation={0}>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        style={{ textAlign: "center" }}
      >
        {name}
      </Typography>
      <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
        {images.map((item) => {
          return (
            <Link
              key={item.id}
              href={parent ? `${parent}/${item.path}` : item.path}
              style={{ textDecoration: "none", color: "#000" }}
            >
              <div className="image-wrapp">
                <img src={item.image} className="image-block" />
                <div className="title-card">
                  <span style={{ marginLeft: "10px" }}>{item.title}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Paper>
  );
}
