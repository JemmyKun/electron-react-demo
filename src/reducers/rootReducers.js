import {
    combineReducers
} from 'redux';
import {
    todoList,
    inputValue
} from './todo';

export default combineReducers({
    todoList,
    inputValue
})