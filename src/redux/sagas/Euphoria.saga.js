import axios from "axios"
import { put, takeLatest } from "redux-saga/effects"

//saga function that will call all of the requests to the server
function* euphoriaSaga() {
    yield takeLatest("FETCH_STRAINS", fetchStrains)
    yield takeLatest("ADD_NOTES", addNotes)
    yield takeLatest("DELETE_STRAINS", deleteStrains)
    yield takeLatest("LIKE_STRAINS", likeStrains)
}

//fetch strains GET gen function
function* fetchStrains(action) {
   // console.log('fetch strains was dispatched with', action);
    try {
        const response = yield axios.get('/Euphoria')
        console.log('response data is :', response.data);
        yield put({ type: "SET_STRAINS", payload: response.data })
    } catch (err) {
        console.log('error in fetching strains', err);
    }
}

//add notes POST gen function 
function* addNotes(action) {
    console.log('add notes was dispatched with:', action);
    try{
        yield axios.post('/Euphoria', {
            note: action.payload
        })
        //refreshing data with fetch/get
        yield put({ type: 'FETCH_STRAINS'})
    } catch(err){
        console.log('error posting notes on redux side', err);
    }
}

//Delete strains delete gen function
function* deleteStrains(action){
    console.log('delete strain was dispatched with:', action);
    try{
        yield axios.delete(`/Euphoria/${action.payload}`)
        //refreshing data with fetch/get
        yield put({ type: 'FETCH_STRAINS'})
    } catch(err){
        console.log('error deleting strains onn redux side', err);
    }
}

//liking/ updating strains gen function 
function* likeStrains(action){
    try{
       const response = yield axios.put(`/Euphoria/${action.payload.id}`)
       yield put ({ type: "LIKE_STRAINS", payload: response.data})
    } catch (err){
        console.log('error liking strains on redux side', err);
    }
}

//exporting sagas 
export default euphoriaSaga;