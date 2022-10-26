const API_KEY = `9d62cfa90c0b87c805e8bb6f03218475`;
const BASE_URL = `https://api.openweathermap.org/data/2.5`;

// https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=current,minutely,hourly,alerts&appid=9d62cfa90c0b87c805e8bb6f03218475&units=metric

const weatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    console.log(`url is:`, url);

    return fetch(url)
        .then((res) => res.json())
        .then((data) => data);
};

export default weatherData;
