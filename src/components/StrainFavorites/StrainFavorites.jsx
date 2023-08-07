//imports
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";

//StrainFavorites function
function StrainFavorites() {
  //bringing in use history
  const history = useHistory();

  //bringing in useDisptch
  const dispatch = useDispatch();

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
  //handle click for the image routing to edit
  const handleImgClick = () => {
    strainEditRoute();
  };

  //dispatch to the delete reducer
  const handleStrainDelete = (id) => {
    console.log("id is:", id);
    dispatch({
      type: "DELETE_STRAINS",
      payload: id,
    });
  };

  //render
  return (
    <>
    <div>
      {likedStrains.map((strain) => (
        <div key={strain.id}>
          <h1>{strain.strain_name}</h1>
          <button onClick={() => handleStrainDelete(strain.image.id)}>❌</button>
          <img src={strain.image} onClick={handleImgClick} />
        </div>
      ))}
    </div>
  </>
);
}

//export component
export default StrainFavorites;
