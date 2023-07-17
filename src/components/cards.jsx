import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";

import { Link } from "react-router-dom";



const Cards = ({ results}) => {
  let display;
  if (results) {
    display = results.map((x) => {
      let { id, image, name } = x;
      return (
        <Card key={id} sx={{ width: "10%" }}>
          <CardActionArea
            onClick={() => {
              window.filtro = {name}
            }}
            component={Link}
            to={`/products`}
          >
            <CardMedia component="img" image={image} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
    });
  }
  return <>{display}</>;
};

export default Cards;
