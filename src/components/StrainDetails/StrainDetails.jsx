//imports
import { useSelector, useDispatch } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

//strain Details function
function StrainDetails({}) {
  //bringing in use dispatch
  const dispatch = useDispatch();

  //bringing in use history
  const history = useHistory();

  //bringing in use selector to grab from strains reducer
  const strains = useSelector((store) => store.strains);
  console.log("strains data", strains);

  //dynamic routes for scpecific strain click
  const params = useParams();
  console.log("params is :", params);

  //grabbing the single id so that the data isnt lost on like
  const strain = strains.find((strain) => strain.id == params.id);
  console.log("strain is :", strain);

  //handler for liking strains button
  const handleStrainLikes = (id) => {
    console.log("id is ", id);
    dispatch({
      type: "LIKE_STRAINS",
      payload: strain.id,
    });
  };

  //favorites route handler
  const favRouteHandler = () => {
    history.push("/favorites");
  };

  // Conditional rendering to check if strain exists before rendering the component
  if (!strain) {
    return <div>Loading...</div>;
  }

  //render
  return (
    <>
      <div>
        <h1>{strain.strain_name}</h1>
        <div>
          <button onClick={() => handleStrainLikes(strain.id)}>❤️</button>
          <button onClick={favRouteHandler}>Go to Favorites</button>
          <img src={strain.image} />
        </div>
        <p>{strain.description}</p>
        <p>positive feelings: {strain.positive_feelings}</p>
        <p>negative feelings: {strain.negative_feelings}</p>
      </div>
    </>
  );
}

//export module
export default StrainDetails;
