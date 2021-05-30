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


function getApi() {
    let weatherRequest = 'https://api.openweathermap.org/data/2.5/weather?q=' +inputEl.value+'&appid=2def30f041fde414f518e072ee1f5cf7';

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
             iconEl.innerHTML = iconValue;
             tempEl.innerHTML = tempValue;
             humidEl.innerHTML = humidValue;
             windEl.innerHTML = windValue;

             
        });
}

fetchButton.addEventListener('click', getApi);
 