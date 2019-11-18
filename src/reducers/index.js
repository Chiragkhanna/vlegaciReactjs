import { combineReducers } from 'redux'
import controlReducer from './control'
import runReducer from './runReducer'
import noteReducer from '../containers/notes/reducers'
import tableCellNotes from './tableCellNotes'

export default combineReducers({
    controlReducer, runReducer, noteReducer,
    tableCellNotes
})