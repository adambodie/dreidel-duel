
export function addTurn(number) {
	return {
		type: 'ADD_TURN',
		number
	}
}

export function resetTurn(number) {
	return {
		type: 'RESET_TURN',
		number
	}
}

export function disableAddButton(boolean) {
	return {
		type: 'DISABLE_ADD_BUTTON',
		boolean
	}
}

export function enableAddButton(boolean) {
	return {
		type: 'ENABLE_ADD_BUTTON',
		boolean
	}
}

export function disableResetButton(boolean) {
	return {
		type: 'DISABLE_RESET_BUTTON',
		boolean
	}
}

export function enableResetButton(boolean) {
	return {
		type: 'ENABLE_RESET_BUTTON',
		boolean
	}
}

export function disableStartButton(boolean) {
	return {
		type: 'DISABLE_START_BUTTON',
		boolean
	}
}

export function enableStartButton(boolean) {
	return {
		type: 'ENABLE_START_BUTTON',
		boolean
	}
}
