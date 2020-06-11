function get_township_data() {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.uppco.com/_uppco-outage-files/sorted/sorted_uppco_township.json?timestamp=${new Date().getTime()}`).then((res) => {
      township_data = res.data;
      resolve();
    });
  });
}

function get_zipcode_data() {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.uppco.com/_uppco-outage-files/sorted/sorted_uppco_zipcode.json?timestamp=${new Date().getTime()}`).then((res) => {
      zipcode_data = res.data;
      resolve();
    });
  });
}
function get_county_data() {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.uppco.com/_uppco-outage-files/sorted/sorted_uppco_county.json?timestamp=${new Date().getTime()}`).then((res) => {
      county_data = res.data;
      resolve();
    });
  });
}
