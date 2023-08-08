//used to store likes returned from the user 
const likeReducer = (state = [], action) => {
    switch (action.type){
        case "SET_LIKE_STRAINS":
            return action.payload
        default:
            return state;
    }
}
export default likeReducer;