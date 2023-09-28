// wait for the DOM to be fully loaded before executing the script
window.addEventListener('DOMContentLoaded', () => {
  // Select all checkboxes on the page
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  // Select the <h4> element inside the element with class "amenities"
  const amenities_h4 = document.querySelector('.amenities h4');
  // Select the element with the ID "api_status"
  const apiStatusDiv = document.querySelector('#api_status');

  // Initialize an empty list to store selected amenities
  let amenities_list = [];

  // Loop through each checkbox
  checkboxes.forEach(checkbox => {
    // Add a change event listener to each checkbox
    checkbox.addEventListener('change', (e) => {
      // Check if the checkbox is checked
      if (e.target.checked === true) {
        // If checked, add the amenity name to the list
        amenities_list.push(checkbox.getAttribute('data-name'));
      } else {
        // If unchecked, remove the amenity name from the list
        amenities_list = amenities_list.filter(name => name !== checkbox.getAttribute('data-name'));
      }
      // Update the displayed amenities list with a comma-separated string
      amenities_h4.innerHTML = amenities_list.join(', ');

      // Request the API status from the specified URL
      fetch('http://0.0.0.0:5001/api/v1/status/')
        .then(response => response.json())
        .then(data => {
          // Check if the API status is "OK" and update the class accordingly
          if (data.status === 'OK') {
            apiStatusDiv.classList.add('available');
          } else {
            // If the API status is not "OK," remove the "available" class
            apiStatusDiv.classList.remove('available');
          }
        })
        .catch(error => {
          // Log an error message if there's an issue with the API request
          console.error('Error fetching API status:', error);
        });
      $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        data: '{}',
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
          $('SECTION.places').append(data.map(place => {
            return `<ARTICLE>
                                      <DIV class="title">
                                        <H2>${place.name}</H2>
                                        <DIV class="price_by_night">
                                          ${place.price_by_night}
                                        </DIV>
                                      </DIV>
                                      <DIV class="information">
                                        <DIV class="max_guest">
                                          <I class="fa fa-users fa-3x" aria-hidden="true"></I>
                                          </BR>
                                          ${place.max_guest} Guests
                                        </DIV>
                                        <DIV class="number_rooms">
                                          <I class="fa fa-bed fa-3x" aria-hidden="true"></I>
                                          </BR>
                                          ${place.number_rooms} Bedrooms
                                        </DIV>
                                        <DIV class="number_bathrooms">
                                          <I class="fa fa-bath fa-3x" aria-hidden="true"></I>
                                          </BR>
                                          ${place.number_bathrooms} Bathrooms
                                        </DIV>
                                      </DIV>
                                      <DIV class="description">
                                        ${place.description}
                                      </DIV>
                                    </ARTICLE>`;
          }));
        }
      });
    });
  });
});
