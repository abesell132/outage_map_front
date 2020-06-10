var map, township_data, zipcode_data, county_data;
var map_view = "county";

function initMap() {
  load_map();
  start_map_population(0);
}

function start_map_population(reload) {
  get_township_data().then(() => {
    get_zipcode_data().then(() => {
      get_county_data().then(() => {
        if (!reload) {
          add_region_layers();
        }
      });
    });
  });
}
