import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

// Strain Details function
function StrainDetails() {
  // Bringing in use dispatch
  const dispatch = useDispatch();

  // Bringing in use history
  const history = useHistory();

  // Bringing in use selector to grab data from strains reducer
  const strains = useSelector((store) => store.strains);

  // Dynamic route parameters for specific strain
  const params = useParams();

  // Find the single strain by id
  const strain = strains.find((strain) => strain.id == params.id);

  // State to track if the like button is clicked
  const [liked, setLiked] = useState(false);

  // Handler for liking strains button
  const handleStrainLikes = (id) => {
    dispatch({
      type: 'LIKE_STRAINS',
      payload: strain.id,
    });
    setLiked(true); // Set liked to true on click
  };

  // Favorites route handler
  const favRouteHandler = () => {
    history.push('/favorites');
  };

  // Conditional rendering to check if strain exists before rendering the component
  if (!strain) {
    return <div>Loading...</div>;
  }

  // Render
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70%' }}>
      <Card sx={{ maxWidth: '50%', width: '100%', textAlign: 'center' }}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
            {strain.strain_name}
          </Typography>
          <CardMedia
            component="img"
            height="auto"
            image={strain.image}
            alt={strain.strain_name}
            style={{ maxWidth: '100%', margin: '0 auto' }}
          />
          <Typography variant="body2" color="text.secondary" style={{ marginBottom: '0.5rem' }}>
            {strain.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Positive feelings: {strain.positive_feelings}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ fontWeight: 'bold' }}>
            Negative feelings: {strain.negative_feelings}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            aria-label="like"
            onClick={() => handleStrainLikes(strain.id)}
            color={liked ? 'secondary' : 'default'} // Turn the button red on click
          >
            <FavoriteIcon />
          </IconButton>
          <Button onClick={favRouteHandler}>Go to Favorites</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default StrainDetails;