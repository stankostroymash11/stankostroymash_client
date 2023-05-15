import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { primaryLinks } from "../Menu/links";

export default function SubCategoryWidget({
  category,
  disabled,
  getSub,
  defaultSubCategory,
}) {
  const [subCategoryId, setSubCategoryId] = useState("");

  const handleChange = (event) => {
    setSubCategoryId(event.target.value);
    getSub(() => category.child[event.target.value]);
  };

  useEffect(() => {
    if (category && category.title === "Запчасти") {
      setSubCategoryId("");
    }
  }, [category]);

  useEffect(() => {
    if (category?.child) {
      category?.child.filter((item, index) => {
        if (item.path === defaultSubCategory) {
          setSubCategoryId(index);
          getSub(() => category.child[index]);
          return;
        }
      });
    }else{getSub()}
  }, [category]);

  return (
    <>
      {primaryLinks[category?.index]?.child && (
        <FormControl
          required={true}
          fullWidth={true}
          disabled={disabled}
          size="small"
        >
          <InputLabel>Подкатегория</InputLabel>
          <Select
            value={subCategoryId}
            onChange={handleChange}
            label="Подкатегория"
          >
            {primaryLinks[category.index]?.child.map((item, index) => {
              return (
                <MenuItem value={index} key={item.id}>
                  {item.title}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </>
  );
}
