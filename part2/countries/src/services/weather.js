import axios from 'axios';

const url_base = 'https://api.open-meteo.com/v1/forecast?'
// ?latitude=64&longitude=23&hourly=temperature_2m&start_date=2024-03-04&end_date=2024-03-04
// ?latitude=64&longitude=23&current=temperature_2m,is_day,precipitation,weather_code&start_date=2024-03-04&end_date=2024-03-04

const getWeather = (lat, lng) => {
	const currentDate = new Date().toJSON().slice(0, 10);
	const info = 'current=temperature_2m,is_day,precipitation,weather_code'
	return axios
      .get(`${url_base}latitude=${lat}&longitude=${lng}&${info}&start_date=${currentDate}&end_date=${currentDate}`)
      .then(response => {
		let icon = ''
		let desc = ''
		switch (response.data.current.weather_code) {
			case 0: // Clear sky
				icon = '☀️'; desc = 'Clear sky'; break
			case 1:
				icon = '🌤'; desc = 'Mainly clear'; break
			case 2:
				icon = '🌥'; desc = 'Partly cloudy'; break
			case 3: // Mainly clear, partly cloudy, and overcast
				icon = '☁️'; desc = 'Overcast'; break
			case 45:
				icon = '🌫'; desc = 'Fog'; break
			case 48: // Fog and depositing rime fog
				icon = '🌫'; desc = 'Depositing rime fog';break
			case 51:
				icon = '🌧'; desc = 'Drizzle: light'; break
			case 53:
				icon = '🌧'; desc = 'Drizzle: moderate'; break
			case 55: // Drizzle: Light, moderate, and dense intensity
				icon = '🌧'; desc = 'Drizzle: dense'; break
			case 56:
				icon = '🌨'; desc = 'Freezing Drizzle: light'; break
			case 57: // Freezing Drizzle: Light and dense intensity
				icon = '🌨'; desc = 'Freezing Drizzle: dense'; break
			case 61:
				icon = '🌧'; desc = 'Rain: slight'; break
			case 63:
				icon = '🌧'; desc = 'Rain: moderate'; break
			case 65: // Rain: Slight, moderate and heavy intensity
				icon = '🌧'; desc = 'Rain: heavy'; break
			case 66: 
				icon = '🌨'; desc = 'Freezing Rain: light'; break
			case 67: // Freezing Rain: Light and heavy intensity
				icon = '🌨'; desc = 'Freezing Rain: heavy'; break
			case 71:
				icon = '☃️'; desc = 'Snow fall: slight'; break
			case 73:
				icon = '☃️'; desc = 'Snow fall: moderate'; break
			case 75: // Snow fall: Slight, moderate, and heavy intensity
				icon = '☃️'; desc = 'Snow fall: heavy'; break
			case 77: // Snow grains
				icon = '❄️'; desc = 'Snow grains'; break
			case 80:
				icon = '🌧'; desc = 'Rain showers: slight'; break
			case 81:
				icon = '🌧'; desc = 'Rain showers: moderate'; break
			case 82: // Rain showers: Slight, moderate, and violent
				icon = '🌧'; desc = 'Rain showers: violent'; break
			case 85:
				icon = '🌨'; desc = 'Snow showers: slight'; break
			case 86: // Snow showers slight and heavy
				icon = '🌨'; desc = 'Snow showers: heavy'; break
			case 95: // Thunderstorm: Slight or moderate
				icon = '⛈'; desc = 'Thunderstorm: Slight or moderate'; break
			case 96:
				icon = '⛈'; desc = 'Thunderstorm with sligh hail'; break
			case 99: // Thunderstorm with slight and heavy hail
				icon = '⛈'; desc = 'Thunderstorm with heavy hail'; break
		}
		return {...response.data, icon:icon, desc:desc}
	})
}

export default { getWeather }