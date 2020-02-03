// reducers.js
import types from './types';

const INITIAL_STATE = {
    count: 0,
    showSpinner: false,
    notesData: []
}
const noteReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.UPDATE_NOTES: {
            console.log(action);
            let newNotes = state.notesData.map((post) => {

                if (post.trcseq === action.data.RLSEQ) {
                    return {
                        ...post,
                        notes: action.data.notes
                    }
                } else return post;
            });
            // if (isAdded === true) {
            //     let tempDate = new Date();
            //     let currentdate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate()
            //     newNotes = newNotes.concat({
            //         "Run": "1",
            //         "Section": action.data.sectionName,
            //         "RLSEQ": action.data.RLSEQ,
            //         "Timestamp": currentdate,
            //         "Comment": action.data.note,
            //         "key": ' {"RunId_1" + "_Section_" + action.data.sectionName + "_RLSEQ_" + action.data.RLSEQ } '
            //     });
            // }
            return {
                ...state, notesData: newNotes
            }
        }
        case types.DELETE_NOTES: {
            let isAdded = true;
            let newNotes = state.notesData.map((post) => {

                if (post.RLSEQ === action.data.RLSEQ) {
                    isAdded = false;
                    return {
                        ...post,
                        note: action.data.note
                    }
                } else return post;
            });

            return {
                ...state, notesData: newNotes
            }
        }

        case types.REQUEST_NOTES: {
            return {
                ...state,
                //notesData: [],
                showSpinner: true
            }
        }

        case types.RECEIVE_NOTES: {
            console.log(action);
            const { notesDatajson } = action;
            return {
                ...state,
                notesData: state.notesData.concat(notesDatajson),
                showSpinner: false

            }
        }

        default: return state;
    }
}

export default noteReducer;