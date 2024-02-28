import axios from 'axios' 

const url_base = 'http://localhost:3001/persons'

const getAll = () => {
	return axios
      .get(url_base)
      .then(response => response.data)
}

const create = newPerson => {
	return axios
		.post(url_base, newPerson)
		.then(response => response.data)
}

const deletePerson = personID => {
	return axios
		.delete(`${url_base}/${personID}`)
		.then(response => response.data)
}

const update = person => {
	return axios
		.put(`${url_base}/${person.id}`, person)
		.then(response => response.data)
}

export default { getAll, create, deletePerson, update }