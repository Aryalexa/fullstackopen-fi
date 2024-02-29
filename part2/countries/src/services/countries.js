import axios from 'axios' 

const url_base = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
	return axios
      .get(`${url_base}/all`)
      .then(response => response.data)
}

const getOne = country => {
	return axios
		.get(`${url_base}/name/${country}`)
		.then(response => response.data)
}

export default { getAll, getOne }