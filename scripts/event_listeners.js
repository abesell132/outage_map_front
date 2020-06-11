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
      strokeColor: "rgba(0,0,0,.6)",
    });
  });
  map.addListener("click", function () {
    if (info_windows) {
      close_info_windows();
    }
  });
  map.data.addListener("click", function (event) {
    map.data.overrideStyle(event.feature, {
      strokeWeight: 1,
      fillColor: "rgba(0,0,0,1)",
    });
    click_features.push(event.feature);

    let latitude = event.latLng.lat();
    let longitude = event.latLng.lng();
    open_info_window(latitude, longitude, event.feature);
  });
}
function open_info_window(latitude, longitude, feature, reload = 0) {
  console.log(feature);
  if (info_windows) {
    close_info_windows();
  }
  let info_window_content = get_info_window_content(feature, reload);
  let infowindow = new google.maps.InfoWindow();
  infowindow.setContent(info_window_content);
  infowindow.setPosition(new google.maps.LatLng(latitude, longitude));
  infowindow.setOptions({
    pixelOffset: new google.maps.Size(0, -5),
  });
  info_windows.push(infowindow);
  info_window_coords = {
    lat: latitude,
    lng: longitude,
  };
  if (!reload) {
    info_window_feature = get_feature_from_event(feature);
  } else {
    info_window_feature = feature;
  }
  console.log(info_window_feature);
  // Wait .1s and then open Info Window
  info_windows[0].open(map);

  infowindow.addListener("closeclick", function () {
    close_info_windows();
  });
}

function get_info_window_content(feature, reload) {
  let feature_NAME;
  if (!reload) {
    feature_NAME = feature.getProperty("NAME");
  } else {
    feature_NAME = feature.properties.NAME;
  }
  let data_feature = get_feature_from_event(feature_NAME);

  let content;
  var percentOut = parseFloat(100 - (data_feature.properties.CustomersOut / data_feature.properties.TotalCustomers) * 100).toFixed(1);
  if (data_feature.properties.CustomersOut > 0) {
    if (percentOut > 99.9) {
      percentOut = 99.9;
    }
  }

  if (map_view === "county_data") {
    content =
      '<div style="font-size:15px; padding:5px 10px 3px 0; font-weight:Bold">' +
      data_feature.properties.LABEL +
      "</div><div>Customers Out: <strong>" +
      data_feature.properties.CustomersOut +
      "</strong></div><div>Percent On: <strong>" +
      percentOut +
      "%</strong></div><div>Customers Served: <strong>" +
      data_feature.properties.TotalCustomers +
      "</strong></div>";
    return content;
  } else if (map_view === "zipcode_data") {
    // let percentOut = data_feature.PercentOut === null ? 0 : data_feature.PercentOut
    content =
      '<div style="font-size:15px; padding:5px 10px 3px 0; font-weight:Bold">' +
      data_feature.properties.ZCTA5CE10 +
      "</div><div>Customers Out: <strong>" +
      data_feature.properties.CustomersOut +
      "</strong></div><div>Percent On: <strong>" +
      percentOut +
      "%</strong></div><div>Customers Served: <strong>" +
      data_feature.properties.TotalCustomers +
      "</strong></div>";
    return content;
  } else if (map_view === "township_data") {
    // let percentOut = data_feature.PercentOut === null ? 0 : data_feature.PercentOut
    content =
      '<div style="font-size:15px; padding:5px 10px 3px 0; font-weight:Bold">' +
      data_feature.properties.LABEL +
      "</div><div>Customers Out: <strong>" +
      data_feature.properties.CustomersOut +
      "</strong></div><div>Percent On: <strong>" +
      percentOut +
      "%</strong></div><div>Customers Served: <strong>" +
      data_feature.properties.TotalCustomers +
      "</strong></div>";
    return content;
  }
}
function close_info_windows() {
  reset_click_styles();
  for (let a = 0; a < info_windows.length; a++) {
    info_windows[a].close();
  }
  info_windows = [];
  info_window_feature = undefined;
}

function reset_click_styles() {
  map.data.overrideStyle(click_features[0], {
    fillColor: "rgba(0,0,0,.6)",
    strokeWeight: 1,
    strokeColor: "rgba(0,0,0,.6)",
    zIndex: 1,
  });
  click_features = [];
}

function get_feature_from_event(feature_NAME) {
  for (let a = 0; a < this[map_view].features.length; a++) {
    if (this[map_view].features[a].properties.NAME == feature_NAME) {
      let data_feature = this[map_view].features[a];
      return data_feature;
    }
  }
}
