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

btn.addEventListener('click', async () => {
    let inputVal = document.querySelector('#enter-place').value
    place = inputVal
    place = place.toUpperCase()
    placeName.innerHTML = place
    let date = getDate()
    let { temp, humidity, iconId, dayVibe, windSpeed, pressure, feelsLike } = await getData()
    let { tempInCel, tempInFar } = convertTemp(temp)
    let { tempInCel: newTemp } = convertTemp(feelsLike)
    let imgUrl = getImgUrl(iconId)
    date1.innerHTML = date
    tempShow.innerHTML = tempInCel.toFixed(1) + `<sup class="super-script1">°C</sup>`
    humidityVal.innerHTML = `${humidity}<sub>%</sub>`
    windVal.innerHTML = `${windSpeed}<sub>m/sec</sub>`
    pressureVal.innerHTML = `${pressure}<sub>hpa</sub>`
    feelsLikeBox.innerHTML = `Feels like ${newTemp.toFixed(1)}<sup class="super-script2">°C</sup>`
    // weatherIcon.setAttribute(src, imgUrl)
    // weatherIcon.src = imgUrl
    console.log(imgUrl)
})

enterVal.addEventListener('keyup', async (e) => {
    if (e.key == 'Enter' && enterVal.value != '') {
        let inputVal = document.querySelector('#enter-place').value
        place = inputVal
        place = place.toUpperCase()
        placeName.innerHTML = place
        let date = getDate()
        let { temp, humidity, iconId, dayVibe, windSpeed, pressure, feelsLike } = await getData()
        let { tempInCel, tempInFar } = convertTemp(temp)
        let { tempInCel: newTemp } = convertTemp(feelsLike)
        let imgUrl = getImgUrl(iconId)
        date1.innerHTML = date
        tempShow.innerHTML = tempInCel.toFixed(1) + `<sup class="super-script1">°C</sup>`
        humidityVal.innerHTML = `${humidity}<sub>%</sub>`
        windVal.innerHTML = `${windSpeed}<sub>m/sec</sub>`
        pressureVal.innerHTML = `${pressure}<sub>hpa</sub>`
        feelsLikeBox.innerHTML = `Feels like ${newTemp.toFixed(1)}<sup class="super-script2">°C</sup>`
        // weatherIcon.setAttribute(src, imgUrl)
        // weatherIcon.src = imgUrl
        console.log(dayVibe)
    }
})

async function getLatAndLon() {
    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${place}&appid=${apiKey}`
    let response = await fetch(url)
    data = await response.json()
    data = data[0]
    lat = data.lat
    lon = data.lon
    return { lat, lon }
}

async function getData() {
    let { lat, lon } = await getLatAndLon()
    let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    let response = await fetch(url2)
    data = await response.json()
    let temp = data.main.temp
    let humidity = data.main.humidity
    let pressure = data.main.pressure
    let feelsLike = data.main.feels_like
    let windSpeed = data.wind.speed
    let iconId = data.weather[0].icon
    let dayVibe = data.weather[0].main
    return { temp, humidity, windSpeed, iconId, dayVibe, pressure, feelsLike }
}

function convertTemp(temp) {
    let tempInCel = temp - 273.15
    let tempInFar = (tempInCel * 9 / 5) + 32
    return { tempInCel, tempInFar }
}

function getImgUrl(id) {
    let url = "http://openweathermap.org/img/w/" + id + ".png";
    return url
}

function getDate() {
    const d = new Date();
    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${date}/${month}/${year}`
}