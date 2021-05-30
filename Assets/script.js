searchResults = document.querySelector('search-history-container')


var fetchButton = document.querySelector('searchbtn')

function getApi() {
    var requestUrl = ''

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i < data.length; i++) {
                console.log(data);
            }
        });
}

fetchButton.addEventListener('click', getApi);