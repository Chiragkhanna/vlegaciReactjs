//import { ITEMS_FETCH_DATA_SUCCESS } from './items'
export function controlsFetchDataSuccess(items) {

    return {
        type: 'CONTROLS_FETCH_DATA_SUCCESS',
        controlList: items
    }
}

export function updateRunId(items) {

    return {
        type: 'UPDATE_RUN_ID',
        selectedRunId: items
    }
}

export const toggleIsRunChange = () => ({ type: 'TOGGLE_IS_RUN_CHANGE' })