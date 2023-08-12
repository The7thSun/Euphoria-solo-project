import axios from "axios"
import { put, takeLatest } from "redux-saga/effects"

//saga function that will call all of the requests to the server
function* euphoriaSaga() {
    yield takeLatest("FETCH_STRAINS", fetchStrains)
    yield takeLatest("ADD_NOTES", addNotes)
    yield takeLatest("DELETE_STRAINS_ID", deleteStrainsId)
    yield takeLatest("LIKE_STRAINS", likeStrains)
    yield takeLatest("FETCH_FAVORITE_STRAINS", fetchFavoriteStrains)
}

//fetch strains GET gen function
function* fetchStrains(action) {
    console.log('fetch strains was dispatched with', action);
    try {
        const response = yield axios.get('/Euphoria')
        console.log('response data is :', response.data);
        yield put({ type: "SET_STRAINS", payload: response.data })
    } catch (err) {
        console.log('error in fetching strains', err);
    }
}

//fetch strains GET gen function for favorites
function* fetchFavoriteStrains(action) {
    // console.log('fetch strains was dispatched with', action);
     try {
         const response = yield axios.get('/Euphoria/favorites')
         console.log('response data is :', response.data);
         yield put({ type: "SET_LIKE_STRAINS", payload: response.data })
     } catch (err) {
         console.log('error in fetching favorite strains', err);
     }
 }

//add notes PUT gen function 
function* addNotes(action) {
    console.log('add notes was dispatched with:', action.payload);
    try{
        yield axios.put(`/Euphoria/${action.payload.id}`, {
            note: action.payload.notes
        })
        //refreshing data with fetch/get
        yield put({ type: "FETCH_FAVORITE_STRAINS"})
    } catch(err){
        console.log('error posting notes on redux side', err);
    }
}

//Delete strains delete id gen function
function* deleteStrainsId(action){
    console.log('delete strain was dispatched with:', action);
    try{
        yield axios.delete(`/Euphoria/${action.payload}`)
        //refreshing data with fetch/get
        yield put({ type: "FETCH_FAVORITE_STRAINS"})
    } catch(err){
        console.log('error deleting strains id on redux side', err);
    }
}

//liking/ updating strains gen function 
function* likeStrains(action){
    try{
       const response = yield axios.post(`/Euphoria/${action.payload}`, {like: true})
       //refreshing data with get 
       yield put ({ type: "FETCH_FAVORITE_STRAINS", payload: response.data})
       console.log('response.data is:', response.data);
    } catch (err){
        console.log('error liking strains on redux side', err);
    }
}

//exporting sagas 
export default euphoriaSaga;