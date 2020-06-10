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
