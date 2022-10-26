const API_KEY = `9d62cfa90c0b87c805e8bb6f03218475`;
const BASE_URL = `https://api.openweathermap.org/data/2.5`;

// https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=current,minutely,hourly,alerts&appid=9d62cfa90c0b87c805e8bb6f03218475&units=metric

const getWeatherData = (infoType, searchParams) => {
    //infoType is type of API we're calling
    const url = new URL(BASE_URL + '/' + infoType);

    //searchParams is an object that will convert into a query
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    return fetch(url).then((res) => res.json());
};

// grabs specific weather data and FORMATS it into one object
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

    //return all of this data in one object
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
    //obj destructuring
    let { timezone, daily, hourly } = data;

    daily = daily.slice(1, 6).map();
};

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
        'weather',
        searchParams
    ).then(formatCurrentWeather);

    //
    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData('onecall', {
        lat,
        lon,
        exclude: 'current,minutely,alerts',
        //this units will change depending on °C / °F
        units: searchParams.units,
    }).then(formatForecastWeather);

    return formattedCurrentWeather;
};

export default getFormattedWeatherData;
