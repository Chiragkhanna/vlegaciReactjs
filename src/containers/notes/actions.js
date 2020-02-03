// actions.js
import types from './types.js';

export function updateNote(value) {
    return {
        type: types.UPDATE_NOTES,
        data: value
    }
};
export function deleteNote(value) {
    return {
        type: types.DELETE_NOTES,
        data: value
    }
};

export function requestNotesJson(updateNoteURL) {
    return {
        type: types.REQUEST_NOTES
    }
};
export function receiveNotesJson(json) {
    return {
        type: types.RECEIVE_NOTES,
        notesDatajson: json
    }
}
