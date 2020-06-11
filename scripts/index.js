var map, township_data, zipcode_data, county_data;
var marker_clusters = [];
var info_windows = [];
var click_features = [];
var map_view = "county_data";

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
        } else {
          info_windows[0].open(map);
        }
        checkMapError();
        add_outages_to_map();
        add_outages_to_table();
      });
    });
  });
}
setInterval(function () {
  var today = new Date();
  var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  console.log("Fetching new outages at: " + dateTime);
  info_windows[0].close();
  start_map_population(1);
}, 180000);

function checkMapError() {
  jQuery.getJSON("https://www.uppco.com/_uppco-outage-files/sorted/map_error.json", function (data) {
    try {
      if (data.errorCode == 1) {
        jQuery("#map-error").html("<div>ATTENTION CUSTOMERS: We are experiencing issues with our Outage Map, please check back later. We apologize for the inconvenience.</div>");
        jQuery("#outage-page-content").addClass("has-map-error");
      }
    } catch (e) {
      jQuery("#map-error").html("");
      jQuery("#outage-page-content").removeClass("has-map-error");
    }
  });
}
