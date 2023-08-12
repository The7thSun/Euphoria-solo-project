import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Strain Edit function
function StrainEdit() {
  // Bringing in useDispatch
  const dispatch = useDispatch();

  // Bringing in use useState
  const [noteToAdd, setNoteToAdd] = useState("");

  // Bringing in use selector to grab from strains reducer
  const strains = useSelector((store) => store.strains);

  // Dynamic routes for specific strain click
  const params = useParams();

  // Finding the single strain by id
  const strain = strains.find((strain) => strain.id == params.id);

  // Bringing in use selector to grab from addNotes store
  const nugget = useSelector((store) => store.addNotes);

  // Handler for posting notes
  const handleStrainNotes = () => {
    dispatch({
      type: "ADD_NOTES",
      payload: {
        id: params.id,
        notes: noteToAdd,
      },
    });
    setNoteToAdd("");
  };

  // Dispatching an action to fetch strains to grab data
  useEffect(() => {
    dispatch({ type: "FETCH_FAVORITE_STRAINS", payload: params.id });
  }, []);

  // Conditional rendering to check if strain exists before rendering the component
  if (!nugget) {
    return <div>Loading...</div>;
  }

  // Render
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70%' }}>
      <Card sx={{ maxWidth: '50%', width: '100%', textAlign: 'center' }}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
            {nugget.strain_name}
          </Typography>
          <CardMedia
            component="img"
            height="auto"
            image={nugget.image}
            alt={nugget.strain_name}
            style={{ maxWidth: '100%', margin: '0 auto' }}
          />
          <Typography variant="body2" color="text.secondary" style={{ marginBottom: '0.5rem' }}>
            {nugget.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Positive feelings: {nugget.positive_feelings}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ fontWeight: 'bold' }}>
            Negative feelings: {nugget.negative_feelings}
          </Typography>
        </CardContent>
        <CardActions>
          {/* Input for adding notes */}
          <div style={{ width: '100%', padding: '1rem', boxSizing: 'border-box' }}>
            <Typography variant="body2" color="text.secondary" style={{ marginBottom: '0.5rem' }}>
              Give us feedback on how this strain made you feel!
            </Typography>
            <input
              type="text"
              placeholder="Add notes..."
              value={noteToAdd}
              onChange={(e) => setNoteToAdd(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
            />
            <Button onClick={handleStrainNotes} variant="contained" color="primary" style={{ marginTop: '0.5rem' }}>
              Send
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

// Export module
export default StrainEdit;