searchResults = document.querySelector('#search-history-container');


var fetchButton = document.querySelector('#searchbtn');
var inputEl = document.querySelector('#inputCity');

//Current Day Variables
var NameEl = document.querySelector('#name');
var dateEl = document.querySelector('#date');
var iconEl = document.querySelector('#icon');
var tempEl = document.querySelector('#temp');
var humidEl = document.querySelector('#humid');
var windEl = document.querySelector('#wind');
var uvIndexEl = document.querySelector('#uvindex');


function getApi() {
    let weatherRequest = 'https://api.openweathermap.org/data/2.5/weather?q=' +inputEl.value+'&units=metric&appid=2def30f041fde414f518e072ee1f5cf7';

    // Current forecast fetch and function
    fetch(weatherRequest)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
             console.log(data);

             let nameValue = data.name;
             let iconValue = data.weather[0].icon;
             let tempValue = data.main.temp;
             let humidValue = data.main.humidity;
             let windValue = data.wind.speed;

             NameEl.innerHTML = nameValue;
             iconEl.setAttribute('src', 'https://openweathermap.org/img/wn/' + iconValue);
             tempEl.innerHTML = tempValue + '&#176 Celsius';
             humidEl.innerHTML = 'Humidity: ' + humidValue +'%';
             windEl.innerHTML = windValue + "MPH";

             var latValue = data.coord.lat; // Latitude value from response data
             var longValue = data.coord.lon; // Longitude value from response data

            // Set url variable that contains the url for UV index with and insert lon and lat variables from line 39/40 as paramaters to fulfill the url fetch
             let uvRequest = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latValue+'&lon='+longValue+'&appid=2def30f041fde414f518e072ee1f5cf7';
            fetch(uvRequest)
                .then(function(response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);

                    let uvindexValue = data.current['uvi'];
                    uvIndexEl.innerHTML = uvindexValue;
                })
             
        });
}

fetchButton.addEventListener('click', getApi);
 