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
    map.setCenter({ lat: 45.62, lng: -87.84 });
  }
}

function add_region_layers(reload) {
  if (!reload) {
    set_region_styles();
    set_region_events();
  }

  switch (map_view) {
    case "county_data":
      map.data.addGeoJson(county_data);
      break;
    case "zipcode_data":
      map.data.addGeoJson(zipcode_data);
      break;
    case "township_data":
      map.data.addGeoJson(township_data);
      break;
  }
}

function set_region_styles() {
  map.data.setStyle({
    fillColor: "rgba(0,0,0,.6)",
    strokeWeight: 1,
    strokeColor: "rgba(0,0,0,.6)",
  });
}

function add_outages_to_map() {
  if (marker_clusters) {
    remove_outage_markers();
  }
  for (let a = 0; a < this[map_view].features.length; a++) {
    if (this[map_view].features[a].properties.outages) {
      create_marker_clusters(this[map_view].features[a].properties.outages);
    }
  }
  setTimeout(function () {
    jQuery(window).trigger("resize");
  }, 1000);
}

function remove_outage_markers() {
  for (let a = 0; a < marker_clusters.length; a++) {
    marker_clusters[a].clearMarkers();
  }
  marker_clusters = [];
}

function create_marker_clusters(marker_locations) {
  let markers = [];
  for (let outageIndex = 0; outageIndex < marker_locations.length; outageIndex++) {
    for (let numOutageIndex = 0; numOutageIndex < marker_locations[outageIndex].num_cust; numOutageIndex++) {
      let marker = new google.maps.Marker({
        position: { lat: marker_locations[outageIndex].coordinates[1], lng: marker_locations[outageIndex].coordinates[0] },
        icon: new google.maps.MarkerImage(
          "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
          new google.maps.Size(48, 48),
          new google.maps.Point(0, 0),
          new google.maps.Point(0, 30)
        ),
      });
      markers.push(marker);
    }
  }

  let markerCluster = new MarkerClusterer(map, markers, {
    styles: cluster_styles,
  });

  marker_clusters.push(markerCluster);

  google.maps.event.addListener(markerCluster, "clusterclick", function () {
    close_info_windows();
  });
}
