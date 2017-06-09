const initialState = {
	login : {
		username: '',
		password: '',
		token: ''
	}
}

const signin = (state, data) => {
	console.log("data", data)
	let newData = {
		username: data.username,
		password: data.password,
		token: ''
	}
	let newState = {
	 	...state,
		login: { ...state.login, ...newData }
  }
	return newState
}

const Reducer = (state = initialState, { type, payload }) => {
	switch (type) {
			case 'SIGNIN': {
			return signin(state, payload)
			break;
		}
		default: return state
	}
}

export default Reducer
