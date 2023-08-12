import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

//imports
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

//strain item function
export default function StrainItem({ strain }) {
  //bringing in use history
  const history = useHistory();

  //setting use history to go to details when img is clicked
  const detailsRoute = () => {
    history.push(`/details/${strain.id}`);
  };

  //handler for img click that goes to redux for dynamic handle
  const handleStrainItems = (event) => {
    event.preventDefault();
    detailsRoute();
  };

  return (
    <Box
      sx={{
        backgroundColor: "",
        p: '1px',
        borderRadius: '1px',
        boxShadow: '',
        margin: 2,
        padding: 0.5,
        width: "50%", // Set width to 50% for side-by-side display
        boxSizing: "border-box", // Include padding and margin in width calculation
      }}
    >
      {/* Wrap the Card with a black Box */}
      <Card sx={{ maxWidth: 245, height: 350 }}>
        <CardMedia
          sx={{ height: "70%", objectFit: "contain" }}
          image={strain.image}
          alt={strain.strain_name}
          onClick={handleStrainItems}
          title=""
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ marginBottom: "8px" }}
          >
            {strain.strain_name}
          </Typography>
        </CardContent>
        <CardActions>{/* Add any actions or buttons here */}</CardActions>
      </Card>
    </Box>
  );
}
