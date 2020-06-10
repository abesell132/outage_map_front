function get_township_data() {
  return new Promise((resolve, reject) => {
    axios.get("https://www.uppco.com/_uppco-outage-files/exampleData/sorted_uppco_township.json").then((res) => {
      township_data = res.data;
      resolve();
    });
  });
}

function get_zipcode_data() {
  return new Promise((resolve, reject) => {
    axios.get("https://www.uppco.com/_uppco-outage-files/sorted/sorted_uppco_zipcode.json").then((res) => {
      zipcode_data = res.data;
      resolve();
    });
  });
}
function get_county_data() {
  return new Promise((resolve, reject) => {
    axios.get("https://www.uppco.com/_uppco-outage-files/exampleData/sorted_uppco_county.json").then((res) => {
      county_data = res.data;
      resolve();
    });
  });
}
