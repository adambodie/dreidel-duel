import { combineReducers } from 'redux';

export function turn(state = 0, action) {
	switch(action.type) {
		case 'ADD_TURN':
			return state + 1
		case 'RESET_TURN':
			state = 0;
			return state
		default:
			return state
		}
}

export function startButton(state = false, action) {
	switch(action.type) {
		case 'DISABLE_START_BUTTON':
			state = true;
			return state
		case 'ENABLE_START_BUTTON':
			state = false;
			return state
		default:
			return state
		}
}

export function resetButton(state = true, action) {
	switch(action.type) {
		case 'DISABLE_RESET_BUTTON':
			state = true;
			return state
		case 'ENABLE_RESET_BUTTON':
			state = false;
			return state
		default:
			return state
		}
}

export function addButton(state = true, action) {
	switch(action.type) {
		case 'DISABLE_ADD_BUTTON':
			state = true;
			return state
		case 'ENABLE_ADD_BUTTON':
			state = false;
			return state
		default:
			return state
		}
}

const combineReducer = combineReducers({turn, startButton, addButton, resetButton });
export default combineReducer;
