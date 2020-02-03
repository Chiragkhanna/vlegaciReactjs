// operations.js
import { updateNote, requestNotesJson, receiveNotesJson, deleteNote } from './actions';
import { updateRunDataInStore } from "../../containers/run/action";
import { NOTES_DATA_ADD_API_URL, NOTES_DATA_API_URL } from "../../config/config";

// 'fetchNoteJson()' will fetch the JSON data from the api,
// extract the required information and update the Redux store with it.
export const fetchNoteJson = (url) => {
    return dispatch => {

        // Dispatching this action will toggle the 'showSpinner'
        // flag in the store, so that the UI can show a loading icon.
        dispatch(requestNotesJson(url));
        return fetch(url)
            .then(response => response.json())
            .then(json => {
                let data = [];

                // Dispatching this action while passing the 'data' array 
                // we created above will update the store with this data.
                // It is good practice to send only the required information
                // rather than trimming the data when and where it is used.
                // This is why we aren't sending the entire JSON response to 
                // the Redux store.
                dispatch(receiveNotesJson(data))
            });
    }
};

export const updateNoteJson = (e, val) => {
    return dispatch => {
        console.log(val);
        let url = NOTES_DATA_ADD_API_URL;
        //        return fetch('http://localhost:3004/Notes' + val.partialURL, {
        return fetch(url + val.partialURL, {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'note': val.note })
        })
            .then(response => response.json())
            .then(json => {
                dispatch(updateNote(val));
                dispatch(updateRunDataInStore([
                    {
                        "trcseq": val.RLSEQ,
                        "notes": val.notes
                    }]));
                return json;
            });
    }
};

export const deleteNoteJson = (e, val) => {
    return dispatch => {
        console.log(val);
        let url = NOTES_DATA_ADD_API_URL;
        //dispatch(deleteNote(url));
        //        return fetch('http://localhost:3004/Notes' + val.partialURL, {
        return fetch(url + val.partialURL, {
            method: 'DELETE', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(json => {
                dispatch(updateNote(val));
                dispatch(updateRunDataInStore([
                    {
                        "trcseq": val.RLSEQ,
                        "notes": val.notes
                    }]));
                return json;
            });
    }
}

export const addNoteJson = (e, val) => {
    return dispatch => {
        console.log(val);
        let url = NOTES_DATA_ADD_API_URL;
        return fetch(url + val.partialURL, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'note': val.note })
        })
            .then(response => response.json())
            .then(function (data) {
                return fetch(NOTES_DATA_API_URL + "/" + val.partialURL) //'http://localhost:3004/notes')
            })
            .then(function (response) {
                return response.json();
            })
            .then(json => {
                console.log(json);
                dispatch(receiveNotesJson(json))
                dispatch(updateRunDataInStore(json));
                return json;
            });
    }
};