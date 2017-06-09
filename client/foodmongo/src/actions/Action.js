import axios from 'axios';

export const signin = data => {
	return dispatch => {
		return dispatch({
			type : 'SIGNIN',
			payload : data
		})
	}
	// axios.post('http://localhost:3000/auth/signin', data)
	// 	.then(response =>{
			// console.log('username', data)

		// })
		// .catch(error => {
		// 	console.log(error)
		// })
}
