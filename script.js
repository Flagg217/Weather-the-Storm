const weatherApiKey = "f1b62f70937b6ed6809af5b162146a55"
const SearchButton = document.querySelector("#SearchButton")
const SearchInput = document.querySelector("#SearchInput")
const CityName = document.querySelector("#CityName")
const Temperature = document.querySelector("#CurrentTemp")
const WeatherIcon = document.querySelector("#CurrentWeatherIcon")

const getWeather = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=imperial`)
    const data = await response.json()
    console.log(data)
    DisplayCurrentWeather(data)
}

const DisplayCurrentWeather = (data) => {
    CityName.textContent = data.name
    Temperature.textContent = "TEMP: "+data.main.temp ""
    WeatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
    //finish filout the current weather
}





SearchButton.addEventListener("click", function (){
    if (SearchInput.value ) {
        console.log(SearchInput.value)
        getWeather(SearchInput.value)
        //add call to get weather foreacast funtion
    }
});