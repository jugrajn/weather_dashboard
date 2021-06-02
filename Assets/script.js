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
             iconEl.setAttribute('src', 'https://openweathermap.org/img/w/' + iconValue+'.png');
             iconEl.setAttribute('width', '150');
             iconEl.setAttribute('height', '150');
             tempEl.innerHTML = tempValue + '&#176 Celsius';
             humidEl.innerHTML = 'Humidity: ' + humidValue +'%';
             windEl.innerHTML = windValue + "MPH";

            // REQUEST UV INDEX ---------------------------------
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
            //REQUEST 5-DAY FORECAST---------------------------------
            let cityID = data.id;
             let futureRequest = 'https://api.openweathermap.org/data/2.5/forecast?id='+cityID+'&units=metric&appid=2def30f041fde414f518e072ee1f5cf7';

             fetch(futureRequest)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    var counter=0; // Separate variable to keep track of index of all the class arrays below
                      //variables for 5-Day Forecast Cards
                      let foreHeadEl = document.querySelectorAll('.foreHead');
                    let foreImgEl = document.querySelectorAll('.foreImg');
                    let foreTempEl = document.querySelectorAll('.foreTemp')
                    let foreWindEl = document.querySelectorAll('.foreWind');
                    let foreHumidEl = document.querySelectorAll('.foreHumid');
                    let forecastCards = document.querySelectorAll('.forecast'); //Accessing all Card containers at once

                    
                    
                    for (x=0; x < data.list.length; x++) {
                       
                        if (data.list[x].dt_txt.indexOf("15:00:00") !== -1) {
                            console.log(counter)
                            console.log(foreHeadEl[counter])
                            
                            forecastCards[counter] =""
                            forecastCards[counter].setAttribute('class', 'card');
                            //Forecast Date
                            let dateValue = data.list[x].dt_txt;
                            foreHeadEl[counter].innerHTML = dateValue;
                            
                            //Forecast icon
                            let imgValue = data.list[x].weather[0].icon;
                            foreImgEl[counter].setAttribute('src', 'https://openweathermap.org/img/w/' + imgValue+'.png');
                            foreImgEl[counter].setAttribute('width', 150);
                            foreImgEl[counter].setAttribute('height', 150);

                            //Forecast Temperature
                            let foreTempValue = data.list[x].main.temp;
                            foreTempEl[counter].innerHTML = foreTempValue +'&#176 Celsius';

                            //Forecast Humidity
                            let foreHumidValue = data.list[x].main.humidity;
                            foreHumidEl[counter].innerHTML = 'Humidity: '+foreHumidValue+'%'

                            //Forecast Windspeed
                            let foreWindValue = data.list[x].wind.speed;
                            foreWindEl[counter].innerHTML = foreWindValue+"MPH";

                            counter++
                        } 
                        else {
                           
                        }                          
                    }
                 })        
        });
}

fetchButton.addEventListener('click', getApi);
 