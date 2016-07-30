import fetch from 'isomorphic-fetch';

export function getAllUsers(){
	return fetch('/api/users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}})
	.then(data => data.json())
	.catch(err => console.error(err))
}

export function getUser(username){
	return fetch('/api/users/' + username, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}})
	.then(data => data.json())
	.catch(err => console.error(err))
}

export function addUser(userObj){
	return fetch('/api/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
		body: JSON.stringify(userObj)
	})
	.then(x => console.log("Added!"))
	.catch(err => console.error(err))
}

export function addUser(username, updatedAttrs){
	return fetch('/api/users', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		}
		body: JSON.stringify([username, updatedAttrs])
	})
	.then(x => console.log("Patched!"))
	.catch(err => console.error(err))
}


// export function playerMove(move, userId, increment){
// 	return fetch('/api/userMove',{
// 		method: 'PATCH',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({
// 			move: move,
//       userId: userId,
//       increment: increment
// 		})
// 	})
//   .then(data => data.json())
//   .catch(error => console.error(error));
// }