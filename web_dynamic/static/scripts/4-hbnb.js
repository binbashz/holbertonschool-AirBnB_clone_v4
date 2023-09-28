// Based on ajax
// When the button tag is clicked, a new POST request to places_search should be made with the list of Amenities checked

// Wait for the DOM to be fully loaded before executing the script
$(document).ready(function () {
  // Select all checkboxes on the page
  const checkboxes = $('input[type="checkbox"]');
  // Select the <h4> element inside the element with class "amenities"
  const amenities_h4 = $('.amenities h4');
  // Select the element with the ID "api_status"
  const apiStatusDiv = $('#api_status');

  // Initialize an empty list to store selected amenities
  let amenities_list = [];

  // Select the search button by its ID
  const searchButton = $('#search-button');

  // Add a click event listener to the search button
  searchButton.click(function () {
    // Make a POST request to places_search with the list of Amenities checked
    $.ajax({
      type: 'POST',
      url: '/api/v1/places_search',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ amenities: amenities_list }),
      success: function (data) {
        // Handle the response data and update the places section as needed
        // Example: Update the places section with the data returned from the API
        $('.places').empty(); // Clear existing content
        data.result.forEach(function (place) {
          // Create a new article for each place and append it to the places section
          const article = $('<article>');
          article.html(`
                        <div class="title">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">
                                ${place.price_by_night}
                            </div>
                        </div>
                        <div class="information">
                            <div class="max_guest">
                                <i class="fa fa-users fa-3x" aria-hidden="true"></i><br>
                                ${place.max_guest} Guests
                            </div>
                            <div class="number_rooms">
                                <i class="fa fa-bed fa-3x" aria-hidden="true"></i><br>
                                ${place.number_rooms} Bedrooms
                            </div>
                            <div class="number_bathrooms">
                                <i class="fa fa-bath fa-3x" aria-hidden="true"></i><br>
                                ${place.number_bathrooms} Bathrooms
                            </div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    `);
          $('.places').append(article);
        });
      },
      error: function (error) {
        // Handle errors here
        console.error('Error:', error);
      }
    });
  });

  // Loop through each checkbox
  checkboxes.each(function () {
    // Add a change event listener to each checkbox
    $(this).change(function () {
      // Check if the checkbox is checked
      if ($(this).is(':checked')) {
        // If checked, add the amenity name to the list
        amenities_list.push($(this).data('name'));
      } else {
        // If unchecked, remove the amenity name from the list
        amenities_list = amenities_list.filter(function (name) {
          return name !== $(this).data('name');
        });
      }
      // Update the displayed amenities list with a comma-separated string
      amenities_h4.text(amenities_list.join(', '));
    });
  });

  // Initial API status check
  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function (data) {
      // Check if the API status is "OK" and update the class accordingly
      if (data.status === 'OK') {
        apiStatusDiv.addClass('available');
      } else {
        // If the API status is not "OK," remove the "available" class
        apiStatusDiv.removeClass('available');
      }
    },
    error: function (error) {
      // Handle errors here
      console.error('Error fetching API status:', error);
    }
  });
});
