import React from "react";
import List from "@mui/material/List";
import { primaryLinks } from "./links";
import MenuItemComponent from "./MenuItemComponent";
import { styled } from "@mui/material/styles";
import SearchComponent from "../Search/SearchComponent";

const NewStyleList = styled(List)({
  "& .MuiTypography-root": {
    fontSize: 16,
    lineHeight: 0.5,
  },
});

export default function MenuComponent() {
  return (
    <>
      <SearchComponent />
      <NewStyleList dense={true}>
        {primaryLinks &&
          primaryLinks.map((link) => {
            return <MenuItemComponent key={link.id} link={link} />;
          })}
      </NewStyleList>
    </>
  );
}
