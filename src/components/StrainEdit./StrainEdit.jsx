//imports 
import { useSelector, useDispatch } from "react-redux"

//Strain Edit function 
function StrainEdit(){

    //bringing in useDispatch
    const dispatch = useDispatch()

     //bringing in use selector to grab from strains reducer 
     const strains = useSelector((store) => store.strains)

     //handler for posting notes 
     const handleStrainNotes = () => {
        dispatch({
            type: "ADD_NOTES"
        })
     }
}

//export module 
export default StrainEdit