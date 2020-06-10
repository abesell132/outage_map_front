function initMap() {
  load_map();
  get_township_data().then((res) => {
    console.log(res);
    get_zipcode_data().then((res) => {
      console.log(res);
      get_county_data().then((res) => {
        console.log(res);
        resolve();
      });
    });
  });
}

function start_map_population() {
  load_outage_data();
}
