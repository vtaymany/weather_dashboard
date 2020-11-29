// Function to add items to localstorage array
function addToLocalStorage(searchTerm) {
  var searchHistory = []
  // Parse the serialized data back into an aray of objects
  searchHistory = JSON.parse(localStorage.getItem('search-history')) || []
  // Push the new data (whether it be an object or anything else) onto the array
  searchHistory.push(searchTerm)
  // Re-serialize the array back into a string and store it in localStorage
  localStorage.setItem('search-history', JSON.stringify(searchHistory))
}

// Function to print search history
function printSearchHistory() {
  var updatedHistory = JSON.parse(localStorage.getItem('search-history'))
  $('#past-cities').empty()
  for (i = 0; i < updatedHistory.length; i++) {
    $('#past-cities').prepend(
      '<button class="list-group-item past-city">' +
        updatedHistory[i] +
        '</button>'
    )
  }
  $('.past-city').on('click', function () {
    console.log('hello')
    var pastUserCity = $(this).html()
    var pastUserCityQueryURL =
      'http://api.openweathermap.org/data/2.5/weather?q=' +
      pastUserCity +
      '&units=imperial&appid=1ecf7de7ea24bfd2e7affef635ed6b53'
    $.ajax({
      url: pastUserCityQueryURL,
      method: 'GET',
    }).then(function (response) {
      var cityName = response.name
      var cityDate = moment.unix(response.dt).format('MM/DD/YYYY')
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
        var sevenDayQueryUrl =
          'https://api.openweathermap.org/data/2.5/onecall?lat=' +
          currentLat +
          '&lon=' +
          currentLon +
          '&units=imperial&exclude=current,minutely,hourly,alerts&appid=1ecf7de7ea24bfd2e7affef635ed6b53'
        $('#current-city-name').text(cityName)
        $('#current-city-date').text(cityDate)
        $('#current-city-temperature').html(
          ' ' + currentTemperature + ' &#176;F'
        )
        $('#current-city-humidity').html(' ' + currentHumidity + ' %')
        $('#current-city-wind-speed').html(' ' + currentWindSpeed + ' mph')
        $('#current-city-uv').html(' ' + currentUV)
        $.ajax({
          url: sevenDayQueryUrl,
          method: 'GET',
        }).then(function (response) {
          var sevenDayForecast = response.daily
          console.log(sevenDayForecast)
          for (i = 0; i < 6; i++) {
            var dailyDate = moment
              .unix(sevenDayForecast[i].dt)
              .format('MM/DD/YYYY')
            var dailyIcon =
              'http://openweathermap.org/img/w/' +
              sevenDayForecast[i].weather[0].icon +
              '.png'
            var dailyTemperature = sevenDayForecast[i].temp.day
            var dailyHumidity = sevenDayForecast[i].humidity
            $('#day-' + [i]).html(
              "<div class='card text-center'><div id='single-forecast' class='card-body'><h5 id='forecast-date' class='card-title'>" +
                dailyDate +
                "</h5><img src='" +
                dailyIcon +
                "' alt='weather icon' /><p class='card-text forecast-temperature'>Temp: " +
                dailyTemperature +
                " &#176;F</p><p class='card-text forecast-humidity'>Humidity: " +
                dailyHumidity +
                ' %</p></div></div>'
            )
          }
        })
      })
    })
  })
}

// Clear search history (both in the DOM and local storage)
$(document).ready(function () {
  $('#clear-search-history').on('click', function () {
    localStorage.clear()
    $('#past-cities').empty()
  })
})

// Shows search history on initial load
$(document).ready(function () {
  printSearchHistory()
})

//User search
$(document).ready(function () {
  $('#submit-button').on('click', function () {
    var userCity = $('#inputCity').val()
    addToLocalStorage(userCity)
    printSearchHistory()
    var userCityQueryURL =
      'http://api.openweathermap.org/data/2.5/weather?q=' +
      userCity +
      '&units=imperial&appid=1ecf7de7ea24bfd2e7affef635ed6b53'
    $.ajax({
      url: userCityQueryURL,
      method: 'GET',
    }).then(function (response) {
      var cityName = response.name
      var cityDate = moment.unix(response.dt).format('MM/DD/YYYY')
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
        var sevenDayQueryUrl =
          'https://api.openweathermap.org/data/2.5/onecall?lat=' +
          currentLat +
          '&lon=' +
          currentLon +
          '&units=imperial&exclude=current,minutely,hourly,alerts&appid=1ecf7de7ea24bfd2e7affef635ed6b53'
        $('#current-city-name').text(cityName)
        $('#current-city-date').text(cityDate)
        $('#current-city-temperature').html(
          ' ' + currentTemperature + ' &#176;F'
        )
        $('#current-city-humidity').html(' ' + currentHumidity + ' %')
        $('#current-city-wind-speed').html(' ' + currentWindSpeed + ' mph')
        $('#current-city-uv').html(' ' + currentUV)
        $.ajax({
          url: sevenDayQueryUrl,
          method: 'GET',
        }).then(function (response) {
          var sevenDayForecast = response.daily
          console.log(sevenDayForecast)
          for (i = 0; i < 6; i++) {
            var dailyDate = moment
              .unix(sevenDayForecast[i].dt)
              .format('MM/DD/YYYY')
            var dailyIcon =
              'http://openweathermap.org/img/w/' +
              sevenDayForecast[i].weather[0].icon +
              '.png'
            var dailyTemperature = sevenDayForecast[i].temp.day
            var dailyHumidity = sevenDayForecast[i].humidity
            $('#day-' + [i]).html(
              "<div class='card text-center'><div id='single-forecast' class='card-body'><h5 id='forecast-date' class='card-title'>" +
                dailyDate +
                "</h5><img src='" +
                dailyIcon +
                "' alt='weather icon' /><p class='card-text forecast-temperature'>Temp: " +
                dailyTemperature +
                " &#176;F</p><p class='card-text forecast-humidity'>Humidity: " +
                dailyHumidity +
                ' %</p></div></div>'
            )
          }
        })
      })
    })
  })
})
