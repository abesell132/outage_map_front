var map, township_data, zipcode_data, county_data;
var map_view = "county";

function initMap() {
  load_map();
  start_map_population();
}

function start_map_population() {
  get_township_data().then(() => {
    get_zipcode_data().then(() => {
      get_county_data().then(() => {
        add_data_layers();
      });
    });
  });
}
