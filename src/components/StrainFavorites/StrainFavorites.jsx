//imports
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import React, {useEffect} from 'react';

//StrainFavorites function
function StrainFavorites() {
  //bringing in use history
  const history = useHistory();

  //bringing in useDisptch
  const dispatch = useDispatch();

  //bringing in use params 
  const params = useParams()
  console.log('params is :', params);

  //bringing in use selector and pulling from strains/user/liked starin stores
  const userId = useSelector((store) => store.user);
  const strains = useSelector((store) => store.strains);
  const likedStrains = useSelector((store) => store.likeReducer);
  console.log("strains data is:", strains);
  console.log("user data is:", userId);
  console.log("liked strains is:", likedStrains);

  //setting use history to go to strain edit when the img is clicked
  const strainEditRoute = () => {
    history.push("/edit");
  };
  //handle click for the image routing to edit STILL NEEDS TO BE DONE 
  const handleImgClick = () => {
    strainEditRoute();
  };

  //grabbing the single id so that the delete can have the id it needs
  /*const strain = likedStrains.find( strain =>
    strain.id == params.id
    )*/
 

  //dispatch to the delete reducer
  const handleStrainIdDelete = (id) => {
    console.log("id is:", id);
    dispatch({
      type: "DELETE_STRAINS_ID",
      payload: id,
    });
  };

//dispatching an action to fecth strains to grab my data 
useEffect(() => {
    dispatch({ type: "FETCH_FAVORITE_STRAINS" });
  }, []);

 /* const handleStrainImgDelete = (imageId) => {
    console.log('img is :', imageId);
       dispatch({
        type: "DELETE_STRAINS_IMG",
        payload: imageId
       })
  }*/

  //render
  return (
    <>
    <div>
      {likedStrains.map((strain) => (
        <div key={strain.id}>
          <h1>{strain.strain_name}</h1>
          <button onClick={() => handleStrainIdDelete(strain.id, strain.image)}>❌</button>
          <img src={strain.image} onClick={handleImgClick} />
        </div>
      ))}
    </div>
  </>
);
}

//export component
export default StrainFavorites;
