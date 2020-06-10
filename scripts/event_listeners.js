jQuery("select").on("change", function () {
  // Remove Features to prevent Features Carrying Over after the change
  map.data.forEach(function (feature) {
    map.data.remove(feature);
  });
  if (this.value == "Township") {
    currentlySelectedLayer = "Township";
    map_view = "township_data";
    add_region_layers(1);
  } else if (this.value == "County") {
    currentlySelectedLayer = "County";
    map_view = "county_data";
    add_region_layers(1);
  } else if (this.value == "Zip Code") {
    currentlySelectedLayer = "Zipcode";
    map_view = "zipcode_data";
    add_region_layers(1);
  }
  jQuery("#viewName").html(currentlySelectedLayer);
});
