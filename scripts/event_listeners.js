jQuery("select").on("change", function () {
  // Remove Features to prevent Features Carrying Over after the change
  map.data.forEach(function (feature) {
    map.data.remove(feature);
  });
  if (this.value == "Township") {
    currentlySelectedLayer = "Township";
    map.data.addGeoJson(township_data);
  } else if (this.value == "County") {
    map.data.addGeoJson(county_data);
    currentlySelectedLayer = "County";
  } else if (this.value == "Zip Code") {
    map.data.addGeoJson(zipcode_data);
    currentlySelectedLayer = "Zipcode";
  }
  jQuery("#viewName").html(currentlySelectedLayer);
});
