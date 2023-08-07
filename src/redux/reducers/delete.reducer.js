const deleteReducer = (state = [], action) => {
    switch (action.type) {
      case "DELETE_STRAIN":
        return action.payload
      default:
        return state;
    }
  };
  
  export default deleteReducer;