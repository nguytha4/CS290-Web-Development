// Name: Thanh Nguyen
// Date: 5/12/18
// Class: CS290 - Spring 2018

// --------------------------------------------------------------------------------------------

var apiKey = '5bfd4fa196f758ac78da07bf02fcd6cf';

document.addEventListener('DOMContentLoaded', cityButton);
document.addEventListener('DOMContentLoaded', zipButton);

function cityButton(){
  document.getElementById('getCityWeather').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var cityName = document.getElementById('city').value;
    req.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey, false);
	req.send(null);
	var response = JSON.parse(req.responseText);
	
	var textOutput = " " + "City: " + response.name + " | " + "Temperature (in Kelvin): " + response.main.temp + " | " + "Humidity: " + response.main.humidity;
	
	document.getElementById('weatherResults').textContent = textOutput;

    event.preventDefault();
  })
}

function zipButton(){
  document.getElementById('getZipWeather').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var zipcode = document.getElementById('zip').value;
    req.open('GET', 'https://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + '&appid=' + apiKey, false);
	req.send(null);
	var response = JSON.parse(req.responseText);
	
	var textOutput = " " + "City: " + response.name + " | " + "Temperature (in Kelvin): " + response.main.temp + " | " + "Humidity: " + response.main.humidity;
	
	document.getElementById('weatherResults').textContent = textOutput;

    event.preventDefault();
  })
}