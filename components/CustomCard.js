import React from "react";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";

export default function CustomCard({ image, alt, title, shortDescription, link }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        minWidth: 345,
        height: 350,
        position: "relative",
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height="140" image={image} alt={alt} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: shortDescription }}></div>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          position: "absolute",
          bottom: 0,
          background: "white",
          width: "100%",
        }}
      >
        <Link href={link}>
          <Button size="small" color="primary">
            Далее
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
