//used to store strains returned from the server 
const euphoriaReducer = (state = [], action) => {
    switch (action.type){
        case "SET_STRAINS":
            return action.payload
        default:
            return state;
    }
}

export default euphoriaReducer;