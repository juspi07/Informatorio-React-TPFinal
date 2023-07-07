import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
    CardMedia,
  } from "@mui/material";

 import { Link } from "react-router-dom";
const CardsP = ({ results }) => { 
  let display
    if (results) {
        display = results.map((x) => {
        let { id, images, title, price} = x;
        return(
            <Card key={id} sx={{width: '15%'}}>
              <CardActionArea component={Link} to={`/categorie/${id}`}>
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
                </CardContent>
              </CardActionArea>
            </Card>
          ) 
    
    
    
    
    })
    }
    return <>{display}</>;
  }

  export default CardsP;