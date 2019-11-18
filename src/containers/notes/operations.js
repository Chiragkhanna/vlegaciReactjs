// operations.js
import { updateNote, requestNotesJson, receiveNotesJson } from './actions';

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

                data = json.note.map(child => {
                    child["key"] = "RunId_" + child.Run + "_Section_" + child.Section + "_RLSEQ_" + child.RLSEQ;
                    return child;
                });

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

export const updateNoteJson = (url) => {
    return dispatch => {
        dispatch(updateNote(url));
        return fetch(url)
            .then(response => response.json())
            .then(json => {
                return json;
            });
    }
};
