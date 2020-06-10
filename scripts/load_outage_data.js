function get_township_data() {
  return new Promise((resolve, reject) => {
    axios.get("https://www.uppco.com/_uppco-outage-files/sorted/sorted_uppco_township.json").then((res) => {
      console.log(res);
      resolve();
    });
  });
}

function get_zipcode_data() {
  return new Promise((resolve, reject) => {
    axios.get("https://www.uppco.com/_uppco-outage-files/sorted/sorted_uppco_zipcode.json").then((res) => {
      resolve();
      console.log(res);
    });
  });
}
function get_county_data() {
  return new Promise((resolve, reject) => {
    axios.get("https://www.uppco.com/_uppco-outage-files/sorted/sorted_uppco_county.json").then((res) => {
      console.log(res);
      resolve();
    });
  });
}
