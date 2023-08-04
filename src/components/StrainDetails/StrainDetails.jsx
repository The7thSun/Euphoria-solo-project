//imports 
import { useSelector, useDispatch } from "react-redux"

//strain Details function
function StrainDetails({}){

    //bringing in use dispatch
    const dispatch = useDispatch()

    //bringing in use selector to grab from strains reducer 
    const strains = useSelector((store) => store.strains)
    console.log('strains data', strains);

    //hanadler for liking strains button
        const handleStrainLikes = (id) =>{
            console.log('id is ', id);
            dispatch({
                type: "LIKE_STRAINS",
                payload: id
            })
        }
       
    //render
    return(
        <>
            <div>
                <h1>{strains.strain_name}</h1>
                <div>
                    <button onClick={() => handleStrainLikes(strains.id)}>❤️</button>
                    <img src={strains.image} />
                </div>
                <p>{strains.description}</p>
                <p>positive feelings: {strains.positive_feelings}</p>
                <p>negative feelings: {strains.negative_feelings}</p>
            </div>
        </>
    )
}

//export module 
export default StrainDetails