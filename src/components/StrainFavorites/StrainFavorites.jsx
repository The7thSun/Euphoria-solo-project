import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from 'react';
// MUI imports 
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// StrainFavorites function
function StrainFavorites() {
  // bringing in use history
  const history = useHistory();

  // bringing in useDisptch
  const dispatch = useDispatch();

  // bringing in use selector and pulling from strains/user/liked starin stores
  const userId = useSelector((store) => store.user);
  const likedStrains = useSelector((store) => store.likeReducer);
  console.log("user data is:", userId);
  console.log("liked strains is:", likedStrains);

  // setting use history to go to strain edit when the img is clicked
  const strainEditRoute = (fav_id) => {
    history.push(`/edit/${fav_id}`);
  };
  
  // handle click for the image routing to edit STILL NEEDS TO BE DONE 
  const handleImgClick = (strain) => {
    dispatch({
      type: "SET_NOTES",
      payload: strain
    })
    strainEditRoute(strain.fav_id);
  };

  // dispatch to the delete reducer
  const handleStrainIdDelete = (id) => {
    console.log("id is:", id);
    dispatch({
      type: "DELETE_STRAINS_ID",
      payload: id,
    });
  };

  // dispatching an action to fetch strains to grab my data
  useEffect(() => {
    dispatch({ type: "FETCH_FAVORITE_STRAINS" });
  }, []);

  // render
  return (
    <div>
      {likedStrains.map((strain) => (
        <Box
          key={strain.id}
          sx={{
            backgroundColor: 'black',
            p: '4px',
            borderRadius: '4px',
            boxShadow: '0 0 2px black',
            margin: 1,
            display: 'inline-block'
          }}
        >
          <Card sx={{ maxWidth: 345, height: 450 }}>
            <CardMedia
              sx={{ height: '70%', objectFit: 'contain' }}
              image={strain.image}
              alt={strain.strain_name}
              onClick={() => handleImgClick(strain)}
              title={strain.strain_name}
            />
            <CardContent>
              {/* Set a fixed height for the title area */}
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  marginBottom: '8px',
                  maxHeight: '40px', // Adjust the value as needed
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {strain.strain_name}
              </Typography>
            </CardContent>
            <CardActions>
              {/* Use the Chip component */}
              <Chip
                label="Delete❌"
                onClick={() => handleStrainIdDelete(strain.id, strain.image)}
                clickable
              />
            </CardActions>
          </Card>
        </Box>
      ))}
    </div>
  );
}

// export component
export default StrainFavorites;