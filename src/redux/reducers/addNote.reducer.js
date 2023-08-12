//used to store likes returned from the user 
const addNotes = (state = {}, action) => {
    switch (action.type){
        case "SET_NOTES":
            return action.payload
        default:
            return state;
    }
}
export default addNotes;