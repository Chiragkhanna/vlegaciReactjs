//import { ITEMS_FETCH_DATA_SUCCESS } from '../../actions/items'
export function runSectionFetchDataSuccess(items) {

    return {
        type: 'RUNS_FETCH_DATA_SUCCESS',
        runSectionList: items
    }
}

export const updateRunDataInStore = (value) => ({ type: 'UPDATE_RUN_DATA', data: value })
export const updateNotesInRunDataStore = (value) => ({ type: 'UPDATE_NOTES_IN_RUN_DATA', data: value })