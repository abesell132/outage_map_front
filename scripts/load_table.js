function add_outages_to_table() {
  let totalOut = 0;
  let totalServed = 0;

  jQuery(".table-body").html("");
  if (map_view === "county_data") {
    console.log(this[map_view].features);
    console.log(this[map_view].features.length);
    for (let a = 0; a < this[map_view].features.length; a++) {
      if (this[map_view].features[a].properties.CustomersOut > 0) {
        var percentOut = parseFloat(100 - (this[map_view].features[a].properties.CustomersOut / this[map_view].features[a].properties.TotalCustomers) * 100).toFixed(1);
        if (this[map_view].features[a].properties.CustomersOut > 0) {
          if (percentOut > 99.9) {
            percentOut = 99.9;
          }
        }
        jQuery(".table-body")
          .append(
            '<div class="data-layer"><div class="data-layer-name" onclick="">' +
              this[map_view].features[a].properties.NAME +
              '</div><div class="data-layer-number-of-outages">' +
              this[map_view].features[a].properties.CustomersOut +
              '</div><div class="data-layer-total-customers">' +
              this[map_view].features[a].properties.TotalCustomers +
              '</div><div class="data-layer-percent-out" >' +
              percentOut +
              "%</div></div>"
          )
          .on("click", "div div", function (event) {});
        totalOut += this[map_view].features[a].properties.CustomersOut;
      }
      totalServed = totalServed + this[map_view].features[a].properties.TotalCustomers;
    }
  } else if (map_view === "zipcode_data") {
    for (let a = 0; a < this[map_view].features.length; a++) {
      if (this[map_view].features[a].properties.CustomersOut > 0) {
        var percentOut = parseFloat(100 - (this[map_view].features[a].properties.CustomersOut / this[map_view].features[a].properties.TotalCustomers) * 100).toFixed(1);
        if (this[map_view].features[a].properties.CustomersOut > 0) {
          if (percentOut > 99.9) {
            percentOut = 99.9;
          }
        }
        jQuery(".table-body")
          .append(
            '<div class="data-layer"><div class="data-layer-name">' +
              this[map_view].features[a].properties.ZCTA5CE10 +
              '</div><div class="data-layer-number-of-outages">' +
              this[map_view].features[a].properties.CustomersOut +
              '</div><div class="data-layer-total-customers">' +
              this[map_view].features[a].properties.TotalCustomers +
              '</div><div class="data-layer-percent-out">' +
              percentOut +
              "%</div></div>"
          )
          .on("click", "div div", function (event) {});
        totalOut += this[map_view].features[a].properties.CustomersOut;
      }
      totalServed += this[map_view].features[a].properties.TotalCustomers;
    }
  } else if (map_view === "township_data") {
    for (let a = 0; a < this[map_view].features.length; a++) {
      if (this[map_view].features[a].properties.CustomersOut > 0) {
        var percentOut = parseFloat(100 - (this[map_view].features[a].properties.CustomersOut / this[map_view].features[a].properties.TotalCustomers) * 100).toFixed(1);
        if (this[map_view].features[a].properties.CustomersOut > 0) {
          if (percentOut > 99.9) {
            percentOut = 99.9;
          }
        }
        jQuery(".table-body")
          .append(
            '<div class="data-layer"><div class="data-layer-name">' +
              this[map_view].features[a].properties.LABEL +
              '</div><div class="data-layer-number-of-outages">' +
              this[map_view].features[a].properties.CustomersOut +
              '</div><div class="data-layer-total-customers">' +
              this[map_view].features[a].properties.TotalCustomers +
              '</div><div class="data-layer-percent-out">' +
              percentOut +
              "%</div></div>"
          )
          .on("click", "div div", function (event) {});
        totalOut += this[map_view].features[a].properties.CustomersOut;
      }
      totalServed += this[map_view].features[a].properties.TotalCustomers;
    }
  }

  var percentOut = parseFloat(100 - (totalOut / totalServed) * 100).toFixed(1);
  if (totalOut > 0 && percentOut > 99.9) {
    percentOut = 99.9;
  }

  jQuery(".table-foot #total-outages").html(totalOut);
  jQuery(".table-foot #total-served").html(totalServed);
  jQuery(".table-foot #total-percent-out").html(percentOut + "%");
}
