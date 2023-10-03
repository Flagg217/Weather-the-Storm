const weatherApiKey = "f1b62f70937b6ed6809af5b162146a55"
const SearchButton = document.querySelector("#SearchButton")
const SearchInput = document.querySelector("#SearchInput")
const SavedCities = document.querySelector("#SavedCities")
const SavedCitiesList = document.querySelector("#SavedCitiesList")
const CityName = document.querySelector("#CityName")
const Temperature = document.querySelector("#CurrentTemp")
const CurrentWind = document.querySelector("#CurrentWind")
const WeatherIcon = document.querySelector("#CurrentWeatherIcon")
const CurrentHumidity = document.querySelector("#CurrentHumidity")
const ForecastContainer = document.querySelector("#ForecastContainer")

const getWeather = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=imperial`)
    const data = await response.json()
    console.log(data)
    saveCity(data.name)
    //take the name in the data and save it to an array in local storage (extra: if the array already contains the name, dont add it again)
    DisplayCurrentWeather(data)
}

const saveCity = (city) => {
    let savedCities = JSON.parse(localStorage.getItem("savedCities")) || []
    if (savedCities.includes(city)) {
        return
    }
    savedCities.push(city)
    localStorage.setItem("savedCities", JSON.stringify(savedCities))
    DisplaySavedCities() 
}

const DisplaySavedCities = () => {
    SavedCitiesList.innerHTML = ""
    let savedCities = JSON.parse(localStorage.getItem("savedCities")) || []
    for (let i = 0; i < savedCities.length; i++) {
        const cityEl = document.createElement("button")
        cityEl.textContent = savedCities[i]
        cityEl.addEventListener("click", function () {
            getWeather(savedCities[i])
            getForecast(savedCities[i])
        })
        SavedCitiesList.append(cityEl)
    }
}

const DisplayCurrentWeather = (data) => {
    CityName.textContent = data.name
    Temperature.textContent = "TEMP: "+data.main.temp+" F "
    WeatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
    //finish filout the current weather
    CurrentWind.textContent = "Wind Speed: "+data.wind.speed+" MPH"
    CurrentHumidity.textContent = "Humidity: "+data.main.humidity+"%"
}

const getForecast = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=imperial`)
    const data = await response.json()
    console.log(data)
    DisplayForecast(data) 

}
 const DisplayForecast = async (data) => {
    ForecastContainer.innerHTML = ""
    for (let i = 0; i < data.list.length; i += 8) {
        console.log(data.list[i])
        const dayEl = document.createElement("div")
        const dateEl = document.createElement("h3")
        const iconEl = document.createElement("img")
        const tempEl = document.createElement("p")  
        const windEl = document.createElement("p")
        const humidityEl = document.createElement("p")

        dayEl.classList.add("weather-card")
        const date = new Date(data.list[i].dt*1000).toLocaleDateString()

        dateEl.textContent = date
        iconEl.src = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`
        tempEl.textContent = "Temp: "+data.list[i].main.temp+" F"
        windEl.textContent = "Wind: "+data.list[i].wind.speed+" MPH"
        humidityEl.textContent = "Humidity: "+data.list[i].main.humidity+"%"

        dayEl.append(dateEl, iconEl, tempEl, windEl, humidityEl)
        ForecastContainer.append(dayEl)


    }

 }




SearchButton.addEventListener("click", function (){
    if (SearchInput.value ) {
        console.log(SearchInput.value)
        getWeather(SearchInput.value)
        //add call to get weather foreacast funtion
        getForecast(SearchInput.value)
    }
});