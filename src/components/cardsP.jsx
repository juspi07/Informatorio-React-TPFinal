import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
    CardMedia,
    Fab
  } from "@mui/material";

 import { Link } from "react-router-dom";
 import EditIcon from "@mui/icons-material/Edit";


 const Fabs = (aux) => {
  if (localStorage.getItem("Atoken")) {
    return (
      <Fab component={Link} to={`/products/edit/${aux.aux}`} size="small" color="primary">
        <EditIcon />
      </Fab>
    );
  }
};

 const CardsP = ({ results }) => { 
  let display
    if (results) {
        display = results.map((x) => {
        let { id, images, title, price} = x;
        return(
            <Card key={id} sx={{width: '15%'}}>
              <CardActionArea component={Link} to={`/products/${id}`}>
                <CardMedia
                    component="img"
                    image={images['0']}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="h7" component="div">
                    ${price}
                  </Typography>
                  <Fabs aux={id}></Fabs>
                </CardContent>
              </CardActionArea>
            </Card>
          ) 
    
    
    
    
    })
    }
    return <>{display}</>;
  }

  export default CardsP;