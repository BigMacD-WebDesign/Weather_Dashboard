let APIKey = "9a936c558ee294585acc3927c01d451b";

$(document).ready(function () {

    $("#searchBtn").on("click", function () {
        let inputVal = $("#input").val();
        currentWeather(inputVal);
        forecast(inputVal);
        var history = getHistory;
        history.push(inputVal);
        localStorage.setItem("searchHistory", JSON.stringify(history));
        console.log(localStorage.getItem("searchHistory"));
    });
    
    display();
});

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
            $("#currentforecast").empty();
            $("#currentforecast").append(`<div class="card bg-info text-dark" style="width: 18rem;"> <h3>${response.name}</h3><p>${currentDate}</p><p>${response.main.temp}°F
            </p><p>${response.wind.speed}mph</p><p>${response.main.humidity}%</p><img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png"></div>`)
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
            $("#futureforecast").empty();
            for (var i = 0; i < response.list.length; i = i + 8) {
                $("#futureforecast").append(`<div class="card bg-info text-dark" style="width: 18rem;"><p>${response.list[i].dt_txt}</p><p>${response.list[i].main.temp}°F
                </p><p>${response.list[i].wind.speed}mph</p><p>${response.list[i].main.humidity}%</p><img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png"></div>`)
            };
        });
};

var getHistory = JSON.parse(window.localStorage.getItem("searchHistory")) || [];
console.log(getHistory);


function display() {
    console.log(getHistory.length);
    $("#history").empty();
    for (var i = 0; i < getHistory.length; i++) {
        $("#history").append(`<div class="container" style="margin: 3%;" ><button class="data btn btn-primary" data-cityName="${getHistory[i]}">${getHistory[i]}</button> <br></div>`);
        console.log();
    }
}
$("#history").on("click", ".data", function () {
    var cityName = $(this).attr("data-cityName");
    console.log(cityName);
    currentWeather(cityName);
    forecast(cityName);
});

