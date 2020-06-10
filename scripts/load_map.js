function load_map() {
  if (window.innerWidth > 1100) {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 46.488547, lng: -87.967636 },
      zoom: 8,
      minZoom: 8,
      maxZoom: 14,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      styles: map_style,
    });
  } else if (window.innerWidth < 1100 && window.innerWidth > 600) {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 45.612387602370305, lng: -87.83630082054981 },
      zoom: 7.5,
      minZoom: 7,
      maxZoom: 14,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      styles: map_style,
    });
  } else if (window.innerWidth < 600) {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 45.612387602370305, lng: -87.83630082054981 },
      zoom: 7,
      minZoom: 7,
      maxZoom: 14,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      styles: map_style,
    });
  }
}

function add_region_layers(reload) {
  if (!reload) {
    set_region_styles();
    set_region_events();
  }

  switch (map_view) {
    case "county":
      map.data.addGeoJson(county_data);
      break;
    case "zipcode":
      map.data.addGeoJson(zipcode_data);
      break;
    case "township":
      map.data.addGeoJson(township_data);
      break;
  }
}

function set_region_styles() {
  map.data.setStyle({
    fillColor: "rgb(0,0,0,.60)",
    strokeWeight: 1,
    strokeColor: "black",
  });
}

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
}
