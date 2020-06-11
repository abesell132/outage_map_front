let map_style = [
  {
    featureType: "administrative",
    elementType: "all",
    stylers: [
      {
        hue: "#ff0000",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        weight: "1",
      },
      {
        color: "#e2e0dd",
      },
      {
        saturation: "0",
      },
    ],
  },
  {
    featureType: "landscape.natural.landcover",
    elementType: "geometry.fill",
    stylers: [
      {
        saturation: "100",
      },
      {
        lightness: "49",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#c2d0a6",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#b2b2b2",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#80aaa6",
      },
    ],
  },
];

var myDirectory = "https://uppco.com/wp-content/themes/bb-theme-child";
var images = myDirectory + "/img/m";

var cluster_styles = [
  {
    url: images + "1.png",
    textColor: "white",
    textSize: 12,
    height: 53,
    width: 53,
    anchor: [0, 0],
  },
  {
    url: images + "2.png",
    textColor: "black",
    textSize: 13,
    height: 56,
    width: 56,
    anchor: [0, 0],
  },
  {
    url: images + "3.png",
    textColor: "white",
    textSize: 13,
    height: 59,
    width: 59,
    anchor: [0, 0],
  },
  {
    url: images + "4.png",
    textColor: "white",
    textSize: 15,
    height: 71,
    width: 71,
    anchor: [0, 0],
  },
  {
    url: images + "5.png",
    textColor: "white",
    textSize: 15,
    height: 71,
    width: 71,
    anchor: [0, 0],
  },
];
