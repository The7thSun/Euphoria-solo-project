//imports
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";

//strain item function
function StrainItem({ strain }) {
  //bringing in use history
  const history = useHistory();

  //bringing in use dispatch
  const dispatch = useDispatch();

  //setting use history to go to details when img is clicked
  const detailsRoute = () => {
    history.push(`/details/${strain.id}`);
  };

  //handler for img click that goes to redux for dynamic handle
  const handleStrainItems = (event) => {
    event.preventDefault();
    detailsRoute();
  };

  //render
  return (
    <>
      <div key={strain.id}>
        <h2>{strain.strain_name}</h2>
        <img
          src={strain.image}
          alt={strain.strain_name}
          onClick={handleStrainItems}
        />
      </div>
    </>
  );
}

//exporting StrainItem to Strain list for appending data 
export default StrainItem