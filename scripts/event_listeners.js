jQuery("select").on("change", function () {
  // Remove Features to prevent Features Carrying Over after the change
  map.data.forEach(function (feature) {
    map.data.remove(feature);
  });
  if (this.value == "Township") {
    currentlySelectedLayer = "Township";
    add_region_layers(1);
  } else if (this.value == "County") {
    add_region_layers(1);
    currentlySelectedLayer = "County";
  } else if (this.value == "Zip Code") {
    add_region_layers(1);
    currentlySelectedLayer = "Zipcode";
  }
  jQuery("#viewName").html(currentlySelectedLayer);
});
