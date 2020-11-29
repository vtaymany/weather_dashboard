$(document).ready(function () {
  $('#submit-button').on('click', function () {
    var userCity = $('#inputCity').val()
    var userCityQueryURL =
      'http://api.openweathermap.org/data/2.5/weather?q=' +
      userCity +
      '&units=imperial&appid=1ecf7de7ea24bfd2e7affef635ed6b53'
    $.ajax({
      url: userCityQueryURL,
      method: 'GET',
    }).then(function (response) {
      var cityName = response.name
      var currentLat = response.coord.lat
      var currentLon = response.coord.lon
      var currentTemperature = response.main.temp
      var currentHumidity = response.main.humidity
      var currentWindSpeed = response.wind.speed
      var UVqueryURL =
        'http://api.openweathermap.org/data/2.5/uvi?lat=' +
        currentLat +
        '&lon=' +
        currentLon +
        '&appid=1ecf7de7ea24bfd2e7affef635ed6b53'
      $.ajax({
        url: UVqueryURL,
        method: 'GET',
      }).then(function (response) {
        var currentUV = response.value
        $('#current-city-name').text(cityName)
      })
    })
  })
})

// $.ajax({
//   url: queryURL,
//   method: 'GET',
// }).then(function (response) {})
