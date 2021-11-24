// import {getCities} from './city.js';

  // window.addEventListener('DOMContentLoaded',async () => {
  //     const foundedCities = await getCities('Teh');
  //     console.log(foundedCities);
  // })
// console.log("lodash",_.debounce);
const debounced = _.debounce(searchCities,500);
function handleInputChange(event)
{
    debounced();
}
async function searchCities(event)
{
    const searchInputElement = document.getElementsByClassName('search__input')[0];
    const foundedCities = await getCities(searchInputElement.value);
    const searchSuggestionElement = document.getElementsByClassName('search__suggestion')[0];
    const searchElement = document.getElementsByClassName('search')[0];
    toggleSuggestion(searchInputElement.value);
    if(foundedCities.length)
    {
        loadFoundedCities(foundedCities);
        setRecentHistory(foundedCities);
    }
    else
    {
        const emptyElement = `<div class="empty__message"><span>${event.target.value} not found </span><span>please search another city</span></div>`;
        searchSuggestionElement.innerHTML = emptyElement;
    }
}
function toggleSuggestion(isShow)
{
    const searchSuggestionElement = document.getElementsByClassName('search__suggestion')[0];
    isShow ?
        searchSuggestionElement.classList.add('search__suggestion--active'):
        searchSuggestionElement.classList.remove('search__suggestion--active');
    !isShow &&(()=>
    {
        searchSuggestionElement.innerHTML = '';
    })();

}
function handleInputBlur()
{
    setTimeout(() => toggleSuggestion(false),500);
}
function setRecentHistory(passedData)
{

    let data = passedData.splice(0,8);

    localStorage.setItem("RECENT_CITIES",JSON.stringify(data));
}
function handleInputFocus()
{
    let foundedCities = localStorage.getItem("RECENT_CITIES");
    foundedCities = JSON.parse(foundedCities);
    if(foundedCities && foundedCities.length)
    {
        loadFoundedCities(foundedCities);
        toggleSuggestion(true);
    }

}
function loadFoundedCities(foundedCities)
{
    const searchSuggestionElement = document.getElementsByClassName('search__suggestion')[0];
    let items = `<ul class="search__items">`
    foundedCities.forEach(city =>
    {
        const itemElement = `<li id="${city.id}" class="search__items" onclick="getCityName(+this.id,this.innerHTML),this">${city.name}</li>`
        items += itemElement;
    })
    items += '</ul>';
    searchSuggestionElement.innerHTML = items;
}
function getCityName(id,name)
{
    getCurrentWeatherById(id);
    const searchInputElement = document.getElementsByClassName('search__input')[0] ;
    searchInputElement.value = name;
}

function getCurrentWeatherInfo(weather)
{
    console.log(weather);
    const cityEl = document.querySelector('.city-temperature__title');
    const degreeEl = document.querySelector('.temperature__current-degree');
    const dayEl = document.querySelector('.city-temperature__current-day');
    const pressureEl = document.querySelector('.pressure');
    const windEl = document.querySelector('.windEl');
    const humidityEl = document.querySelector('.humidity');
    const iconEl = document.querySelector('.icon');
    cityEl.innerHTML = `${weather.name} ,${weather.sys.country}`;
    degreeEl.innerHTML = `${(weather.main.temp - 273.15).toFixed(2)} °C`;
    iconEl.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    dayEl.innerHTML = moment(weather.dt,'X').format('dddd');
    humidityEl.innerHTML = `${weather.main.humidity}%`;
    pressureEl.innerHTML = `${weather.main.pressure} hPa`;
}
function loadByLocation()
{
    navigator.geolocation.watchPosition(showPosition);
}
function showPosition(position)
{
    getCurrentWeatherByCoordinates((position.coords.latitude).toFixed(2),(position.coords.longitude).toFixed(2));
    console.log();
}



