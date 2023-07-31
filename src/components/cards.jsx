import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardMedia,
  Fab,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { Link } from "react-router-dom";


const Fabs = (aux) => {
  if (localStorage.getItem("Atoken")) {
    return (
      <Fab component={Link} to={`/categories/edit/${aux.aux}`} size="small" color="primary">
        <EditIcon />
      </Fab>
    );
  }
};

const Cards = ({ results }) => {
  let display;
  if (results) {
    display = results.map((x) => {
      let { id, image, name } = x;
      return (
        <Card key={id} sx={{ width: "10%" }}>
          <CardActionArea
            onClick={() => {
              localStorage.setItem('filtro', name)
            }}
            component={Link}
            to={`/products`}
          >
            <CardMedia component="img" image={image} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <Fabs aux={id}></Fabs>
            </CardContent>
          </CardActionArea>
        </Card>
      );
    });
  }
  return <>{display}</>;
};

export default Cards;
