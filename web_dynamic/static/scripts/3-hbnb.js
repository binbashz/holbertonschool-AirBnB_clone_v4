$(document).ready(function () {
  let selectedFeatures = []

  function checkApiStatus () {
    $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:5001/api/v1/status/',
      success: function (response) {
        if (response.status === 'OK') {
          $('#api_status').addClass('available')
        } else {
          $('#api_status').removeClass('available')
        }
      },
      error: function (error) {
        console.error('Error checking API status:', error)
      }
    })
  }

  checkApiStatus()

  function createPlaceArticle (place) {
    const articleHtml = `
      <article>
        <div class="place-title">
          <h2>${place.name}</h2>
          <div class="place-price">$${place.price_by_night}</div>
        </div>
        <div class="place-info">
          <div class="place-max-guests">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
          <div class="place-bedrooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
          <div class="place-bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
        </div>
        <div class="place-description">
          ${place.description}
        </div>
      </article>
    `
    return articleHtml
  }

  function sendPostRequest () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function (placesData) {
        for (const place of placesData) {
          const placeArticle = createPlaceArticle(place)
          $('.places').append(placeArticle)
        }
        console.log('Successfully fetched and displayed places.')
      },
      error: function (error) {
        console.error('Error sending POST request:', error)
      }
    })
  }

  sendPostRequest()

  $('.features input[type="checkbox"]').change(function () {
    const featureId = $(this).data('id')
    const featureName = $(this).data('name')

    if ($(this).is(':checked')) {
      selectedFeatures.push({ id: featureId, name: featureName })
    } else {
      selectedFeatures = selectedFeatures.filter(function (feature) {
        return feature.id !== featureId
      })
    }

    const featuresList = selectedFeatures.map(function (feature) {
      return feature.name
    }).join(', ')

    $('.features h4').text('Selected Features: ' + featuresList)

    console.log('Selected Features:', selectedFeatures)
  })
})
