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

function set_region_events() {
  map.data.addListener("mouseover", function (event) {
    map.data.overrideStyle(event.feature, {
      strokeWeight: 3,
      strokeColor: "#007D44",
    });
  });
  map.data.addListener("mouseout", function (event) {
    map.data.overrideStyle(event.feature, {
      strokeWeight: 1,
      strokeColor: "black",
    });
  });
  map.data.addListener("click", function (event) {
    close_info_windows();
    let info_window_content = get_info_window_content(event.feature);
  });
}

function close_info_windows() {
  reset_click_styles();
  for (let a = 0; a < info_windows.length; a++) {
    info_windows[a].close();
  }
  info_windows = [];
}

function reset_click_styles() {
  map.data.overrideStyle(click_features[0], {
    fillColor: "rgb(0,0,0,.60)",
    strokeWeight: 1,
    strokeColor: "black",
    zIndex: 1,
  });
  click_features = [];
}

function get_info_window_content(feature) {
  console.log(feature);
}
