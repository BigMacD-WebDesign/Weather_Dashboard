let APIKey = "9a936c558ee294585acc3927c01d451b";
var history = JSON.parse(localStorage.getItem("searchHistory")) || [];
$(document).ready(function () {

    
    // let queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    // "q=&appid=" + APIKey;

    $("#searchBtn").on("click", function () {
        let inputVal = $("#input").val();
        currentWeather(inputVal);
        forecast(inputVal);
        var history = []
        history.push(inputVal);
        localStorage.setItem("searchHistory", history);
    });





});

function search() {
    console.log(localStorage.getItem("searchHistory"));
    for (let i = 0; i < history.length; i++) {
        $("#history").append(`<button>${history[i]}</button>`);
    }
}

function currentWeather(cityName) {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + cityName + "&appid=" + APIKey;
    let currentDate = new Date().toLocaleDateString();
    $
        .ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            console.log(response);
            $("#currentforecast").append(`<h3>${response.name}</h3><p>${currentDate}</p><p>${response.main.temp}°F
            </p><p>${response.wind.speed}mph</p><p>${response.main.humidity}%</p><img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`)
        });
};

function forecast(cityName) {
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;
    $
        .ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            console.log(response);
            for (var i = 0; i < response.list.length; i = i+8) {
                $("#futureforecast").append(`<div class="card" style="width: 18rem;"><p>${response.list[i].dt_txt}</p><p>${response.list[i].main.temp}°F
                </p><p>${response.list[i].wind.speed}mph</p><p>${response.list[i].main.humidity}%</p><img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png"></div>`)
            };
        });
};