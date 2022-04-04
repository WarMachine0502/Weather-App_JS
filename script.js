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
    document.querySelector('.toggle').addEventListener('click', toggle);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${(weather.main.temp).toFixed(2)}&deg;C`;

    let minTemp = document.getElementById('min');
    minTemp.innerHTML = `${(weather.main.temp_min).toFixed(2)}&deg;C`;

    let maxTemp = document.getElementById('max');
    maxTemp.innerHTML = `${(weather.main.temp_max).toFixed(2)}&deg;C`;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    

    
    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('assets/clear.jpg')";
        
    } else if(weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('assets/clouds.jpg')";
        
    } else if(weatherType.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('assets/clouds.jpg')";
        
    }     else if(weatherType.textContent == 'Rain') {
        
        document.body.style.backgroundImage = "url('assets/rain.jpg')";
        
    } else if(weatherType.textContent == 'Snow') {
        
        document.body.style.backgroundImage = "url('assets/snow.jpg')";
    
    } else if(weatherType.textContent == 'Thunderstorm') {
    
        document.body.style.backgroundImage = "url('assets/thunder.jpg')";
        
    } else if(weatherType.textContent == 'Mist') {

        document.body.style.backgroundImage = "url('assets/mist.jpg')";
    }

    
    document.querySelector('.toggle').addEventListener('click', toggle);

    toggle();

    
}

function toggle() {
       const temp = document.querySelector('.temp');
       const minTemp = document.querySelector('.minvalue');
       const maxTemp = document.querySelector('.maxvalue');
       const toggle = document.querySelector('.toggle');
       const toggle_c = document.querySelector('.toggle_c');

       if(toggle.classList.contains('active')) {
          temp.innerText = ((parseFloat(temp.innerText) - 32) * 5 / 9).toFixed(2) + "°C";
          minTemp.innerText = ((parseFloat(minTemp.innerText) - 32) * 5 / 9).toFixed(2) + "°C";
          maxTemp.innerText = ((parseFloat(maxTemp.innerText) - 32) * 5 / 9).toFixed(2) + "°C";
          toggle.classList.remove('active');
          toggle_c.classList.add('active');
       } else {
          temp.innerText = ((parseFloat(temp.innerText) * 9 / 5) + 32).toFixed(2) + "°F";
          minTemp.innerText = ((parseFloat(minTemp.innerText) * 9 / 5) + 32).toFixed(2) + "°F";
          maxTemp.innerText = ((parseFloat(maxTemp.innerText) * 9 / 5) + 32).toFixed(2) + "°F";
          toggle.classList.add('active');
          toggle_c.classList.remove('active');
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