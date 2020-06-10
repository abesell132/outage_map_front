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

function add_outages_to_map() {
  remove_outage_markers();
  console.log([map_view].features);

  for (let a = 0; a < [current_map_view].features.length; a++) {
    if (outageLocationData.features[a].properties.outages) {
      create_marker_clusters(outageLocationData.features[a].properties.outages);
    }
  }
}

function remove_outage_markers() {
  for (let a = 0; a < marker_clusters.length; a++) {
    marker_clusters[a].clearMarkers();
  }
  marker_clusters = [];
}

function create_marker_clusters() {
  let markers = [];
  for (let outageIndex = 0; outageIndex < markerLocationArray.length; outageIndex++) {
    for (let numOutageIndex = 0; numOutageIndex < markerLocationArray[outageIndex].num_cust; numOutageIndex++) {
      let marker = new google.maps.Marker({
        position: { lat: markerLocationArray[outageIndex].coordinates[1], lng: markerLocationArray[outageIndex].coordinates[0] },
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
    setTimeout(function () {
      closeInfoWindows();
    }, 0);
  });
}
