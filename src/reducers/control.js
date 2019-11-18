import { ITEMS_IS_LOADING, ITEMS_HAS_ERRORED } from '../actions/items';

const initialState = {
    pending: false,
    controlList: [],
    error: null,
    selectedRunId: null
}

const controlReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REFRESH_CONTROL':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
        // case 'GENERATE_RUN':
        //     return {
        //         ...state,
        //         selectedRunId: action.runId,
        //         isRunIdChange: true
        //     }
        case ITEMS_IS_LOADING:
            return {
                ...state,
                pending: true
            }
        case 'CONTROLS_FETCH_DATA_SUCCESS':
            return {
                ...state,
                pending: false,
                controlList: action.controlList
            }
        case 'UPDATE_RUN_ID':
            return {
                ...state,
                selectedRunId: action.selectedRunId,
                isRunIdChange: true
            }
        case 'TOGGLE_IS_RUN_CHANGE':
            return {
                ...state,
                isRunIdChange: !state.isRunIdChange
            }
        case ITEMS_HAS_ERRORED:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state
    }
}

export default controlReducer


export const getControlList = state => state.controlList;
export const getControlPending = state => state.pending;
export const getControlError = state => state.error;