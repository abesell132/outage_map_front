function load_outage_data() {
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

function get_township_data() {
  axios.get("https://www.uppco.com/_uppco-outage-files/sorted/sorted_uppco_township.json").then((res) => {
    console.log(res);
  });
}

function get_zipcode_data(callback) {
  axios.get("https://www.uppco.com/_uppco-outage-files/sorted/sorted_uppco_zipcode.json").then((res) => {
    console.log(res);
  });
}
function get_county_data(callback) {
  axios.get("https://www.uppco.com/_uppco-outage-files/sorted/sorted_uppco_county.json").then((res) => {
    console.log(res);
  });
}
