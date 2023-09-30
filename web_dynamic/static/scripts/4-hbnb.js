$(document).ready(function () {
  let selectedAmenities = []

  function checkApiHealth () {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:5001/api/v1/status/',
      success: function (data) {
        if (data.status === 'OK') {
          $('#api_status').addClass('healthy')
        } else {
          $('#api_status').removeClass('healthy')
        }
      }
    })
  }

  checkApiHealth()

  $('.amenities input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id')
    const amenityName = $(this).data('name')

    const existingAmenity = selectedAmenities.find(function (amenity) {
      return amenity.id === amenityId
    })

    if ($(this).is(':checked')) {
      if (!existingAmenity) {
        selectedAmenities.push({ id: amenityId, name: amenityName })
      }
    } else {
      selectedAmenities = selectedAmenities.filter(function (amenity) {
        return amenity.id !== amenityId
      })
    }

    const amenitiesList = selectedAmenities.map(function (amenity) {
      return amenity.name
    }).join(', ')

    $('.amenities h4').text('Selected Amenities: ' + amenitiesList)

    console.log('Selected Amenities:', selectedAmenities)
  })

  function createPlaceCard (place) {
    const card = `
      <article>
        <div class="title-box">
          <h2>${place.name}</h2>
          <div class="price">${place.price_by_night}</div>
        </div>
        <div class="info">
          <div class="guests">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
          <div class="rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
          <div class="bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
        </div>
        <div class="description">
          ${place.description}
        </div>
      </article>
    `
    return card
  }

  function sendSearchRequest () {
    const amenityIds = selectedAmenities.map(function (amenity) {
      return amenity.id
    })

    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: amenityIds }),
      success: function (data) {
        $('.places').empty()
        for (const place of data) {
          const card = createPlaceCard(place)
          $('.places').append(card)
        }
        console.log('Search successful')
      }
    })
  }

  sendSearchRequest()

  $('#search-button').click(function () {
    sendSearchRequest()
  })
})
