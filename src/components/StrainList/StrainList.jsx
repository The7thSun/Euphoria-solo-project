//imports 
import React, {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';

//strainsList function 
function StrainList() {

  //bringing in usedispatch
 const dispatch = useDispatch();

 //dispatching an action to fecth strains to grab my data 
  useEffect(() => {
    dispatch({ type: 'FETCH_STRAINS' });
  }, [dispatch]);

  // rendering user reducer info to the DOM
  const user = useSelector((store) => store.user);

  //rendering strain list info to the DOM 
  const strains = useSelector((store) => store.strains)

  //console log to see if the data gets to this point 
  console.log('inside of strains', strains);
  
  //render
  return (
    <>
    <div className="container">
      <h1>Welcome, {user.username}!</h1>
      <h2>{strains.strain_name}</h2>
      <LogOutButton className="btn" />
    </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default StrainList;
