var rootContext = document.body.getAttribute("data-root");
let apiKey = 'b2235684c0a886fd774b800d3348856b';
let btn = document.querySelector('#search')
let placeName = document.querySelector('.place-name')
let date1 = document.querySelector('.date')
let tempShow = document.querySelector('.temp')
let humidityVal = document.querySelector('#humidity-value')
let windVal = document.querySelector('#wind-value')
let pressureVal = document.querySelector('#pressure-value')
let weatherIcon = document.querySelector('#main-img')
let feelsLikeBox = document.querySelector('.feels-like')
let enterVal = document.querySelector('#enter-place')
let readystate = document.readyState



async function myfunc() {
    try {
        let inputVal = document.querySelector('#enter-place').value
        let date = getDate()
        date1.innerHTML = date
        place = inputVal
        let tempDabba = document.querySelector('#enter-place')
        tempDabba.setAttribute('inputmode', 'none')
        let { temp, humidity, iconId, windSpeed, pressure, feelsLike } = await getData(place)
        let { tempInCel } = convertTemp(temp)
        let { tempInCel: newTemp } = convertTemp(feelsLike)
        let imgRef = getImgUrl(iconId)
        tempShow.innerHTML = tempInCel.toFixed(1) + `<sup class="super-script1">°C</sup>`
        place = place.toUpperCase()
        placeName.innerHTML = place
        humidityVal.innerHTML = `${humidity}<sub>%</sub>`
        windVal.innerHTML = `${windSpeed}<sub>m/sec</sub>`
        pressureVal.innerHTML = `${pressure}<sub>hpa</sub>`
        feelsLikeBox.innerHTML = `Feels like ${newTemp.toFixed(1)}<sup class="super-script2">°C</sup>`
        weatherIcon.src = 'Images/' + imgRef
    } catch (error) {
        placeName.innerHTML = 'Not Found'
        weatherIcon.src = 'Images/error.png'
        windVal.innerHTML = '--'
        pressureVal.innerHTML = '--'
        feelsLikeBox.innerHTML = ' '
        tempShow.innerHTML = '--'
        humidityVal.innerHTML = '--'
    }
}

btn.addEventListener('click', myfunc)

enterVal.addEventListener('keyup', async (e) => {
    if (e.key == 'Enter' && enterVal.value != '') {
        myfunc()
    }
})

async function getLatAndLon(place) {
    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${place}&appid=${apiKey}`
    let response = await fetch(url)
    let data = await response.json()
    data = data[0]
    let lat = data.lat
    let lon = data.lon
    let finalPlaceName = data.name
    return { lat, lon, finalPlaceName }
}

async function getData(place) {
    let { lat, lon, finalPlaceName } = await getLatAndLon(place)
    let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    let response = await fetch(url2)
    let data = await response.json()
    let temp = data.main.temp
    let humidity = data.main.humidity
    let pressure = data.main.pressure
    let feelsLike = data.main.feels_like
    let windSpeed = data.wind.speed
    let iconId = data.weather[0].icon
    let dayVibe = data.weather[0].main
    return { temp, humidity, windSpeed, iconId, dayVibe, pressure, feelsLike, finalPlaceName }
}

function convertTemp(temp) {
    let tempInCel = temp - 273.15
    let tempInFar = (tempInCel * 9 / 5) + 32
    return { tempInCel, tempInFar }
}

function getImgUrl(id) {
    let ans;
    if (id == '01d' || id == '01n') {
        ans = 'sun.png'
    }
    else if (id == '02d' || id == '03d' || id == '04d' || id == '02n' || id == '03n' || id == '04n') {
        ans = 'cloudy.png';
    }
    else if (id == '10d' || id == '10n' || id == '09d' || id == '09n') {
        ans = 'rain.png'
    }
    else if (id == '11d' || id == '11n') {
        ans = 'storm.png'
    }
    else if (id == '13d' || id == '13n') {
        ans = 'snowflake.png'
    }
    else if (id == '50d' || id == '50n') {
        ans = 'mist.png'
    }
    else if (id == '09d' || id == '09n') {
        ans = 'drizzle.png'
    }
    return ans;
}

function getDate() {
    const d = new Date();
    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${date}/${month}/${year}`
}