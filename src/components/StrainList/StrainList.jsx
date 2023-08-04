//imports 
import React, {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import StrainItem from '../StrainItem/StrainItem';

//strainsList function 
function StrainList() {

  //bringing in usedispatch
 const dispatch = useDispatch();

  // rendering user reducer info to the DOM
  const user = useSelector((store) => store.user);

  //rendering strain list info to the DOM 
  const strains = useSelector((store) => store.strains)

  //console log to see if the data gets to this point 
  console.log('inside of strains', strains);

 //dispatching an action to fecth strains to grab my data 
 useEffect(() => {
  dispatch({ type: 'FETCH_STRAINS' });
}, []);
  
  //render
  return (
    <>
    <div>
      <h1>Welcome to Euphoria, {user.username}!</h1>
      <section>
        {strains.map((strain) => {
          return <StrainItem key={strain.id} strain={strain}/>
        })}
      </section>
      <LogOutButton className="btn" />
    </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default StrainList;
