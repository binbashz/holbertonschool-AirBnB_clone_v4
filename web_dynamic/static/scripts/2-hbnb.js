$(document).ready(function () {
  let selectedAmenities = []

  function checkApiStatus () {
    $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:5001/api/v1/status/',
      success: function (data) {
        if (data.status === 'OK') {
          $('#api_status').addClass('available')
        } else {
          $('#api_status').removeClass('available')
        }
      }
    })
  }

  checkApiStatus()

  // Select all amenity input checkboxes
  $('.amenities input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id')
    const amenityName = $(this).data('name')

    // Verify if the checkbox is checked or not
    if ($(this).is(':checked')) {
      selectedAmenities.push({ id: amenityId, name: amenityName })
    } else {
      // If unchecked, remove the amenity that matches the Id
      selectedAmenities = selectedAmenities.filter(function (amenity) {
        return amenity.id !== amenityId
      })
    }

    // Update the <h4> tag with the list of selected amenities
    const amenitiesList = selectedAmenities.map(function (amenity) {
      return amenity.name
    }).join(', ')

    $('.amenities h4').text('Selected Amenities: ' + amenitiesList)

    // Check the state of selectedAmenities
    console.log('Selected Amenities:', selectedAmenities)
  })
})
