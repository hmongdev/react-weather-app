import { DateTime } from 'luxon';

const API_KEY = 'b601b84d0e7ce5864247288c5731f8ae';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// https://api.openweathermap.org/data/2.5/weather?lat=44.98&lon=-93.2638&exclude=current,minutely,hourly,alerts&appid=b601b84d0e7ce5864247288c5731f8ae&units=imperial

const getWeatherData = async (infoType, searchParams) => {
	const url = new URL(BASE_URL + '/' + infoType);
	url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

	console.log(searchParams);

	const res = await fetch(url);
	return await res.json();
};

const formatCurrentWeather = (data) => {
	const {
		coord: { lat, lon },
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

const formatForecastWeather = (data) => {
	let { timezone } = data;
	// daily = daily.slice(1, 6).map((d) => {
	//     return {
	//         title: formatToLocalTime(d.dt, timezone, 'ccc'),
	//         temp: d.temp.day,
	//         icon: d.weather[0].icon,
	//     };
	// });

	// hourly = hourly.slice(1, 6).map((d) => {
	//     return {
	//         title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
	//         temp: d.temp,
	//         icon: d.weather[0].icon,
	//     };
	// });

	return { timezone };
};

const getFormattedWeatherData = async (searchParams) => {
	const formattedCurrentWeather = await getWeatherData(
		'weather',
		searchParams
	).then(formatCurrentWeather);

	const { lat, lon } = formattedCurrentWeather;

	const formattedForecastWeather = await getWeatherData('onecall', {
		lat,
		lon,
		exclude: 'current,minutely,alerts',
		units: searchParams.units,
	}).then(formatForecastWeather);

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
