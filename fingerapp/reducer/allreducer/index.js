import {combineReducers} from 'redux';
import animatingDrawer from '../reducerMain'
import {allStudent,allSubject} from '../fetchDataReducer'

export default combineReducers({
    animatingDrawer:animatingDrawer,
    allStudent,allSubject
})