//used to store strains returned from the server 
const strains = (state = [], action) => {
    switch (action.type){
        case "SET_STRAINS":
            return action.payload
        default:
            return state;
    }
}

export default strains;