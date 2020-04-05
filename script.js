$(document).ready(function () {

    let APIKey = "9a936c558ee294585acc3927c01d451b";
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=Bujumbura,Burundi&appid=" + APIKey;

    $("#searchBtn").on("click", function () {
       
        $
        .ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            console.log(response);
        });

    });





});