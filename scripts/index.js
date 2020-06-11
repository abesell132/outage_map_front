var map, township_data, zipcode_data, county_data, info_window_feature;
var marker_clusters = [];
var info_windows = [];
var click_features = [];
var info_window_coords = {};
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
          checkMapError();
        } else {
          close_info_windows(0);
          if (info_window_feature) {
            open_info_window(info_window_coords.lat, info_window_coords.lng, info_window_feature, 1);
          }
        }
        checkMapError();
        add_outages_to_map();
        add_outages_to_table();
      });
    });
  });
}
setInterval(function () {
  start_map_population(1);
  checkMapError();
}, 40000);

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
