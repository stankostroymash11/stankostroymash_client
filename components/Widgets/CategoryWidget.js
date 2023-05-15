import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { primaryLinks } from "../Menu/links";

export default function CategoryWidget({ category, setCategory }) {
  const [categoryId, setCategoryId] = useState("");

  const handleChange = (event) => {
    setCategoryId(event.target.value);
    setCategory({
      ...primaryLinks[event.target.value],
      index: event.target.value,
    });
  };
  useEffect(() => {
    primaryLinks
      .filter((item) => {
        if (item.child || item.title === "Запчасти") {
          return item;
        }
      })
      .map((item, index) => {
        if (item.path === category) {
          setCategory({
            ...primaryLinks[index + 1],
            index: index + 1,
          });
          return setCategoryId(index + 1);
        }
      });
  }, []);

  return (
    <FormControl required={true} fullWidth={true} size="small">
      <InputLabel>Категория</InputLabel>
      <Select value={categoryId} onChange={handleChange} label="Категория">
        {primaryLinks &&
          primaryLinks.map((item, index) => {
            if (item.child) {
              return (
                <MenuItem value={index} key={item.id}>
                  {item.title}
                </MenuItem>
              );
            }
            if (item.title === "Запчасти") {
              return (
                <MenuItem value={index} key={item.id}>
                  {item.title}
                </MenuItem>
              );
            }
          })}
      </Select>
    </FormControl>
  );
}
