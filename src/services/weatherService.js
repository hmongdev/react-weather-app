import { DateTime } from 'luxon';

// https://api.openweathermap.org/data/2.5/weather?lat=44.98&lon=-93.263&&appid=b601b84d0e7ce5864247288c5731f8ae&units=imperial

const API_KEY = 'b601b84d0e7ce5864247288c5731f8ae';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherData = async (infoType, searchParams) => {
	const url = new URL(BASE_URL + '/' + infoType);
	url.search = new URLSearchParams({
		...searchParams,
		appid: API_KEY,
	});

	// const res = await fetch(url);
	// return await res.json();

	return fetch(url).then((response) => response.json());
};

const formatCurrentWeather = (data) => {
	const {
		coord: { lon, lat },
		main: { temp, feels_like, temp_min, temp_max, humidity },
		name,
		dt,
		sys: { country, sunrise, sunset },
		weather,
		wind: { speed },
	} = data;

	const { main: details, icon } = weather[0];

	return {
		lat,
		lon,
		temp,
		feels_like,
		temp_min,
		temp_max,
		humidity,
		name,
		dt,
		country,
		sunrise,
		sunset,
		details,
		icon,
		speed,
	};
};

const getFormattedWeatherData = async (searchParams) => {
	const formattedCurrentWeather = await getWeatherData(
		'weather',
		searchParams
	).then(formatCurrentWeather);

	const { lat, lon } = formattedCurrentWeather;

	const formattedForecastWeather = await getWeatherData('weather', {
		lat,
		lon,
		exclude: 'current,minutely,alerts',
		units: searchParams.units,
	});

	return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

//function with luxon library that formats the local time
const formatToLocalTime = (
	secs,
	zone,
	format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
	`http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
