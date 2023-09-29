$(document).ready(function () {
  const selectedAmenityIds = {};
  const selectedAmenityNames = {};

  // Select all amenity input checkboxes
  $('.amenities input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    // Check if the checkbox is checked or unchecked
    if ($(this).is(':checked')) {
      selectedAmenityIds[amenityId] = amenityName;
      selectedAmenityNames[amenityName] = amenityId;
    } else {
      // Remove the amenity from the selectedAmenities object if unchecked
      delete selectedAmenityIds[amenityId];
      delete selectedAmenityNames[amenityName];
    }

    // Update the <h4> tag with the list of selected amenities
    const selectedAmenitiesList = Object.keys(selectedAmenityIds).join(', ');

    $('.amenities h4').text('Selected Amenities: ' + selectedAmenitiesList);

    // Check the state of selectedAmenityIds
    console.log('Selected Amenity IDs:', selectedAmenityIds);
  });
});
