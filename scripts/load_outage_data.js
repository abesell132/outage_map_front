function load_outage_data() {
  return new Promise((resolve, reject) => {
    get_township_data(resolve);
  });
}

function get_township_data(callback) {
  axios.get("https://www.uppco.com/_uppco-outage-files/sorted/sorted_uppco_township.json").then((res) => {
    console.log(res);
    get_zipcode_data(callback);
  });
}

function get_zipcode_data(callback) {
  axios.get("https://www.uppco.com/_uppco-outage-files/sorted/sorted_uppco_zipcode.json").then((res) => {
    console.log(res);
    get_zipcode_data(callback);
  });
}
function get_county_data(callback) {
  axios.get("https://www.uppco.com/_uppco-outage-files/sorted/sorted_uppco_county.json").then((res) => {
    console.log(res);
    callback();
  });
}
