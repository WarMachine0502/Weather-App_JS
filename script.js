const weatherApi = {
    key: "037a35ec00a7b7cc42df1f1ed34806eb",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}

const search = document.getElementById('input-box');

search.addEventListener('keypress', (event) => {
    
    if(event.keyCode == 13) {
        document.getElementById('app-main').style.margin = "100px auto";
        console.log(search.value);
        getWeatherReport(search.value);
        document.querySelector('.weather-body').style.display = "block";
    }

});

function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

function showWeatherReport(weather){
    console.log(weather);


    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    
    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?sky')";
        
    } else if(weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?landscape, cloudy')";
        
    } else if(weatherType.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?landscape, hazy')";
        
    }     else if(weatherType.textContent == 'Rain') {
        
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?landscape, rain')";
        
    } else if(weatherType.textContent == 'Snow') {
        
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?landscape, snow')";
    
    } else if(weatherType.textContent == 'Thunderstorm') {
    
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?landscape, thunder')";
        
    } else if(weatherType.textContent == 'mist') {

        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?landscape, mist')";
    }
}

function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}