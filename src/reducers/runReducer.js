import { ITEMS_IS_LOADING, ITEMS_HAS_ERRORED } from '../actions/items';

const initialState = {
    pending: false,
    controlList: [],
    error: null,
    selectedRunId: null
}

const runReducer = (state = initialState, action) => {
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
        case 'GENERATE_RUN':
            return {
                ...state,
                selectedRunId: action.runId
            }
        case ITEMS_IS_LOADING:
            return {
                ...state,
                pending: true
            }
        case 'RUNS_FETCH_DATA_SUCCESS':
            return {
                ...state,
                pending: false,
                runSectionList: action.runSectionList
            }
        case ITEMS_HAS_ERRORED:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case 'UPDATE_RUN_DATA':

            return {
                ...state, runSectionList: state.runSectionList.map((post) => {

                    if (post.RLSEQ === action.data.RLSEQ) {
                        return {
                            ...post,
                            note: action.data.note
                        }
                    } else return post;
                })
            }
        default:
            return state
    }
}

export default runReducer
