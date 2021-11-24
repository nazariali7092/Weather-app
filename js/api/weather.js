const BASE_URL = 'api.openweathermap.org/data/2.5';
const API_KEY = 'fad93a5e6e26dc6737ed81e45deaea62';

function getCurrentWeatherById(cityID)
{
   return  fetch(`https://${BASE_URL}/weather?id=${cityID}&appid=${API_KEY}`)
       .then(async response => await response.json())
       .then(result => {
           getCurrentWeatherInfo(result);})
       .catch(error => error);
}

function getFiveDaysWeather(cityID)
{
    return  fetch(`${BASE_URL}/forcast?q=${cityID}&appid=${API_KEY}`)
        .then(response => {return response.json()} )
        .then(result => {return result})
        .catch(error => error);
}
function getCurrentWeatherByCoordinates(lat,lon)
{
    return  fetch(`https://${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        .then(async response => await response.json())
        .then(result => {
            getCurrentWeatherInfo(result);})
        .catch(error => error);
}