var app = new Vue({
  el: "#tinhatapp",
  data: {
    viewData: {
      graphics: true,
      fullviewport: false,
      openmenu: false,
      bodyclass: "",
      winwidth: "",
      winheight: "",
      guiwidth: "",
      guiheight: "",
      smallscreen: "",
      ssview: false,
      orbitConfig: {
        lowOrbit: {
          maxTag: 19000,
          minTag: "",
          minKM: 7000,
          maxKM: 15000,
          minVH: 130,
          maxVH: 140,
        },
        geoOrbit: {
          maxTag: 37500,
          minTag: 34500,
          minKM: 35500,
          maxKM: 36500,
          minVH: 157,
          maxVH: 163,
        },
        medOrbit: {
          maxTag: 60000,
          minTag: 19000,
          minKM: 20000,
          maxKM: 60000,
          minVH: 140,
          maxVH: 175,
        },
        highOrbit: {
          maxTag: 200000,
          minTag: 70000,
          minKM: 150000,
          maxKM: 200000,
          minVH: 180,
          maxVH: 185,
        },
        vhighOrbit: {
          maxTag: 5000000,
          minTag: 200000,
          minKM: 200000,
          maxKM: 4000000,
          minVH: 188,
          maxVH: 195,
        },
        issOrbit: {
          maxTag: "",
          minTag: 200000,
          minKM: 200000,
          maxKM: 100000000000000000000000000000000,
          minVH: 205,
          maxVH: 205,
        },
        degData: {
          maxOffset: 200,
          minOffset: 120,
          maxDeg: 30,
          minDeg: 18,
        },
      },
    },

    userData: {
      lat: "-43.5036",
      lon: "172.5948",
      alt: "0",
      viewAng: "50",
      address: "",
    },

    btnData: [
      {
        name: "cubesats",
        displayName: "Cube Sats",
        saticon: "far fa-stop-circle",
        id: "32",
        satcount: "",
        satloading: false,
      },
      {
        name: "amateur-radio",
        displayName: "Amateur Radio",
        saticon: "fas fa-broadcast-tower",
        id: "18",
        satcount: "",
        satloading: false,
      },
      {
        name: "disaster-monitoring",
        displayName: "Disaster Monitoring",
        saticon: "fas fa-fire-alt",
        id: "8",
        satcount: "",
        satloading: false,
      },
      {
        name: "geostationary",
        displayName: "Geostationary",
        saticon: "fas fa-satellite",
        id: "10",
        satcount: "",
        satloading: false,
      },
      {
        name: "iss",
        displayName: "ISS",
        saticon: "fas fa-rocket",
        id: "2",
        satcount: "",
        satloading: false,
      },
      {
        name: "military",
        displayName: "Military",
        saticon: "fas fa-shield-alt",
        id: "30",
        satcount: "",
        satloading: false,
      },
      {
        name: "starlink",
        displayName: "Starlink",
        saticon: "fas fa-star",
        id: "52",
        satcount: "",
        satloading: false,
      },
      {
        name: "experimental	",
        displayName: "Experimental",
        saticon: "fas fa-bomb",
        id: "19",
        satcount: "",
        satloading: false,
      },
      {
        name: "space-earth-science",
        displayName: "Space & Earth Science",
        saticon: "fas fa-flask",
        id: "26",
        satcount: "",
        satloading: false,
      },
      {
        name: "tv",
        displayName: "TV",
        saticon: "fas fa-satellite-dish",
        id: "34",
        satcount: "",
        satloading: false,
      },
      {
        name: "weather",
        displayName: "Weather",
        saticon: "fas fa-wind",
        id: "3",
        satcount: "",
        satloading: false,
      },
      {
        name: "gps-operational",
        displayName: "GPS Operational",
        saticon: "fas fa-compass",
        id: "20",
        satcount: "",
        satloading: false,
      },
      {
        name: "gps-constellation",
        displayName: "GPS Constellation",
        saticon: "far fa-compass",
        id: "50",
        satcount: "",
        satloading: false,
      },
    ],

    satData: [],

    otherData: {
      queryquota: "0",
    },
  },

  methods: {
    removeAll: function () {
      app.satData = [];
      app.btnData.map(function (x) {
        x.satcount = "";
        return x;
      });
    },

    selectAll: function () {},

    solarFlip: function () {
      if (app.viewData.ssview != true) {
        app.viewData.bodyclass = app.viewData.bodyclass + " solarflip";
        app.viewData.ssview = true;
      } else {
        app.viewData.bodyclass = app.viewData.bodyclass.replace(
          "solarflip",
          ""
        );
        app.viewData.ssview = false;
      }
    },

    fullscreen: function () {
      if (app.viewData.fullscreen != true) {
        app.viewData.bodyclass = app.viewData.bodyclass + " fullscreen";
        app.viewData.fullscreen = true;
        document.body.requestFullscreen();
      } else {
        app.viewData.bodyclass = app.viewData.bodyclass.replace(
          "fullscreen",
          ""
        );
        app.viewData.fullscreen = false;
        document.exitFullscreen();
      }
    },

    fullviewport: function () {
      if (app.viewData.fullviewport != true) {
        app.viewData.bodyclass = app.viewData.bodyclass + " fullviewport";
        app.viewData.fullviewport = true;
      } else {
        app.viewData.bodyclass = app.viewData.bodyclass.replace(
          "fullviewport",
          ""
        );
        app.viewData.fullviewport = false;
      }
    },

    openMenu: function () {
      if (app.viewData.smallscreen != false) {
        if (app.viewData.openmenu != true) {
          app.viewData.bodyclass = app.viewData.bodyclass + " openmenu";
          app.viewData.openmenu = true;
        } else {
          app.viewData.bodyclass = app.viewData.bodyclass.replace(
            "openmenu",
            ""
          );
          app.viewData.openmenu = false;
        }
      }
    },

    activable: function (event) {
      if (event.currentTarget.className == "") {
        event.currentTarget.className = "active";
      } else {
        event.currentTarget.className = "";
      }
    },

    addSats: function (event) {
      // Refresh Viewport size
      app.viewData.guiheight = jQuery(".viewport").outerHeight();
      app.viewData.guiwidth = jQuery(".viewport").outerWidth();

      // What satellite categroy was this button for?
      catid = event.currentTarget.getAttribute("data-catid");

      // Wait, is this categroy already active?
      if (event.currentTarget.className == "active") {
        // Yes? Then deactive it and remove it's satellites
        app.btnData.find((x) => x.id === catid).satloading = false;
        app.btnData.find((x) => x.id === catid).satcount = "";
        app.satData = app.satData.filter(function (obj) {
          return obj.id !== catid;
        });
        jQuery(".animation-catid-" + catid).remove();
      } else {
        // No? Then lets set it to active and load some stuff!
        app.btnData.find((x) => x.id === catid).satloading = true;

        $.ajax({
          type: "GET",
          url:
            "https://cors-anywhere-slga.onrender.com/https://api.n2yo.com/rest/v1/satellite/above/" +
            app.userData.lat +
            "/" +
            app.userData.lon +
            "/" +
            app.userData.alt +
            "/" +
            app.userData.viewAng +
            "/" +
            catid +
            "/&apiKey=RSCL8E-SBWMHN-DMSFAJ-47KU",
          dataType: "json",
          success: function (data) {
            // We have loaded!
            app.btnData.find((x) => x.id === catid).satloading = false;

            // Making the categroy name code friendly - this is just record keeping for dev, can be removed
            var catName = data.info.category.replace(/ /g, "-").toLowerCase();

            // Creating a parent object and array for this category
            app.satData.push({
              name: catName,
              id: catid,
              satcount: data.info.satcount,
              satellites: [],
            });

            // Getting the icons & display name
            var satIcon = app.btnData.find((x) => x.id === catid).saticon;

            // Adding the satellites as object to the above created array
            $.each(data.above, function (name, current) {
              // Set a random direction, left or right
              var dataAniRaw = Math.random() >= 0.5;
              if (dataAniRaw == true) {
                var dataDir = "left";
              } else {
                var dataDir = "right";
              }

              // Mathing out the relative height
              var sataltround = Math.round(current.satalt * 1) / 1;

              // Low Orbit Math ---
              var lowRangeOrbitKM =
                app.viewData.orbitConfig.lowOrbit.maxKM -
                app.viewData.orbitConfig.lowOrbit.minKM;
              var lowRangeOrbitVH =
                app.viewData.orbitConfig.lowOrbit.maxVH -
                app.viewData.orbitConfig.lowOrbit.minVH;
              var low =
                Math.round(
                  (lowRangeOrbitVH *
                    ((sataltround - app.viewData.orbitConfig.lowOrbit.minKM) /
                      lowRangeOrbitKM) +
                    app.viewData.orbitConfig.lowOrbit.minVH) *
                    10000
                ) / 10000;

              // Geostationary Orbit Math ---
              var geoRangeOrbitKM =
                app.viewData.orbitConfig.geoOrbit.maxKM -
                app.viewData.orbitConfig.geoOrbit.minKM;
              var geoRangeOrbitVH =
                app.viewData.orbitConfig.geoOrbit.maxVH -
                app.viewData.orbitConfig.geoOrbit.minVH;
              var geo =
                Math.round(
                  (geoRangeOrbitVH *
                    ((sataltround - app.viewData.orbitConfig.geoOrbit.minKM) /
                      geoRangeOrbitKM) +
                    app.viewData.orbitConfig.geoOrbit.minVH) *
                    10000
                ) / 10000;

              // Medium Earth Orbit Math ---
              var medRangeOrbitKM =
                app.viewData.orbitConfig.medOrbit.maxKM -
                app.viewData.orbitConfig.medOrbit.minKM;
              var medRangeOrbitVH =
                app.viewData.orbitConfig.medOrbit.maxVH -
                app.viewData.orbitConfig.medOrbit.minVH;
              var med =
                Math.round(
                  (medRangeOrbitVH *
                    ((sataltround - app.viewData.orbitConfig.medOrbit.minKM) /
                      medRangeOrbitKM) +
                    app.viewData.orbitConfig.medOrbit.minVH) *
                    10000
                ) / 10000;

              // High Orbit Math ---
              var highRangeOrbitKM =
                app.viewData.orbitConfig.highOrbit.maxKM -
                app.viewData.orbitConfig.highOrbit.minKM;
              var highRangeOrbitVH =
                app.viewData.orbitConfig.highOrbit.maxVH -
                app.viewData.orbitConfig.highOrbit.minVH;
              var high =
                Math.round(
                  (highRangeOrbitVH *
                    ((sataltround - app.viewData.orbitConfig.highOrbit.minKM) /
                      highRangeOrbitKM) +
                    app.viewData.orbitConfig.highOrbit.minVH) *
                    10000
                ) / 10000;

              // Vhigh Orbit Math ---
              var vhighRangeOrbitKM =
                app.viewData.orbitConfig.vhighOrbit.maxKM -
                app.viewData.orbitConfig.vhighOrbit.minKM;
              var vhighRangeOrbitVH =
                app.viewData.orbitConfig.vhighOrbit.maxVH -
                app.viewData.orbitConfig.vhighOrbit.minVH;
              var vhigh =
                Math.round(
                  (vhighRangeOrbitVH *
                    ((sataltround - app.viewData.orbitConfig.vhighOrbit.minKM) /
                      vhighRangeOrbitKM) +
                    app.viewData.orbitConfig.vhighOrbit.minVH) *
                    10000
                ) / 10000;

              // ISS Orbit Math ---
              var issRangeOrbitKM =
                app.viewData.orbitConfig.issOrbit.maxKM -
                app.viewData.orbitConfig.issOrbit.minKM;
              var issRangeOrbitVH =
                app.viewData.orbitConfig.issOrbit.maxVH -
                app.viewData.orbitConfig.issOrbit.minVH;
              var iss =
                Math.round(
                  (issRangeOrbitVH *
                    ((sataltround - app.viewData.orbitConfig.issOrbit.minKM) /
                      issRangeOrbitKM) +
                    app.viewData.orbitConfig.issOrbit.minVH) *
                    10000
                ) / 10000;

              // var dataAltRaw = Math.random() * (195 - 130) + 130;
              // var dataAlt = Math.round(dataAltRaw * 1) / 1;
              var dataAlt = 0;
              var dataDeg = "";

              // Is it geostationary, low earth or really high?
              if (
                sataltround > app.viewData.orbitConfig.geoOrbit.minTag &&
                sataltround < app.viewData.orbitConfig.geoOrbit.maxTag
              ) {
                var orbitType = "geosat";
                var dataDir = "no";
                var dataAlt = geo;
                if (app.viewData.smallscreen != false) {
                  var dataDegRaw = Math.random() * (-8 - 8) + 8;
                } else {
                  var dataDegRaw = Math.random() * (-20 - 20) + 20;
                }
                var dataDeg = Math.round(dataDegRaw * 1000) / 1000;
              } else if (
                sataltround < app.viewData.orbitConfig.lowOrbit.maxTag
              ) {
                var orbitType = "low";
                var dataAlt = low;
              } else if (
                sataltround > app.viewData.orbitConfig.medOrbit.minTag &&
                sataltround < app.viewData.orbitConfig.geoOrbit.minTag
              ) {
                var orbitType = "med";
                var dataAlt = med;
              } else if (
                sataltround > app.viewData.orbitConfig.geoOrbit.maxTag &&
                sataltround < app.viewData.orbitConfig.medOrbit.maxTag
              ) {
                var orbitType = "med";
                var dataAlt = med;
              } else if (
                sataltround > app.viewData.orbitConfig.highOrbit.minTag &&
                sataltround < app.viewData.orbitConfig.highOrbit.maxTag
              ) {
                var orbitType = "high";
                var dataAlt = high;
                var dataDir = dataDir;
              } else if (
                sataltround > app.viewData.orbitConfig.vhighOrbit.minTag &&
                sataltround < app.viewData.orbitConfig.vhighOrbit.maxTag
              ) {
                var orbitType = "vhigh";
                var dataAlt = vhigh;
                var dataDir = dataDir;
              } else if (
                sataltround > app.viewData.orbitConfig.issOrbit.minTag
              ) {
                var orbitType = "iss";
                var dataAlt = iss;
                var dataDir = dataDir;
              } else {
                var orbitType = "other";
                var dataAlt = 0;
              }

              // Mathing out the relative speed

              var speedOrbitMaxLow = 15000;
              var speedOrbitMinLow = 5000;
              var speedSecMaxLow = 50;
              var speedSecMinLow = 20;
              var lowSpeed =
                Math.round(
                  ((speedSecMaxLow - speedSecMinLow) *
                    ((sataltround - speedOrbitMinLow) /
                      (speedOrbitMaxLow - speedOrbitMinLow)) +
                    speedSecMinLow) *
                    10000
                ) / 10000;

              var speedOrbitMaxMed = 60000;
              var speedOrbitMinMed = 20000;
              var speedSecMaxMed = 40;
              var speedSecMinMed = 20;
              var medSpeed =
                Math.round(
                  ((speedSecMaxMed - speedSecMinMed) *
                    ((sataltround - speedOrbitMinMed) /
                      (speedOrbitMaxMed - speedOrbitMinMed)) +
                    speedSecMinMed) *
                    10000
                ) / 10000;

              var speedOrbitMaxHigh = 200000;
              var speedOrbitMinHigh = 100000;
              var speedSecMaxHigh = 100;
              var speedSecMinHigh = 50;
              var highSpeed =
                Math.round(
                  ((speedSecMaxHigh - speedSecMinHigh) *
                    ((sataltround - speedOrbitMinHigh) /
                      (speedOrbitMaxHigh - speedOrbitMinHigh)) +
                    speedSecMinHigh) *
                    10000
                ) / 10000;

              var speedOrbitMaxVhigh = 900000;
              var speedOrbitMinVhigh = 100000;
              var speedSecMaxVhigh = 70;
              var speedSecMinVhigh = 40;
              var vhighSpeed =
                Math.round(
                  ((speedSecMaxVhigh - speedSecMinVhigh) *
                    ((sataltround - speedOrbitMinVhigh) /
                      (speedOrbitMaxVhigh - speedOrbitMinVhigh)) +
                    speedSecMinVhigh) *
                    10000
                ) / 10000;

              var speedOrbitMaxIss = 100000000000000000000000000000000;
              var speedOrbitMinIss = 100000;
              var speedSecMaxIss = 200;
              var speedSecMinIss = 100;
              var issSpeed =
                Math.round(
                  ((speedSecMaxIss - speedSecMinIss) *
                    ((sataltround - speedOrbitMinIss) /
                      (speedOrbitMaxIss - speedOrbitMinIss)) +
                    speedSecMinIss) *
                    10000
                ) / 10000;

              if (orbitType == "low") {
                var dataSpe = lowSpeed;
              } else if (orbitType == "med") {
                var dataSpe = medSpeed;
              } else if (orbitType == "high") {
                var dataSpe = highSpeed;
              } else if (orbitType == "vhigh") {
                var dataSpe = vhighSpeed;
              } else if (orbitType == "iss") {
                var dataSpe = issSpeed;
              } else {
                var dataSpe = vhighSpeed;
              }

              // Creating a timestamp
              var theTimeRaw = new Date();
              var theTime =
                theTimeRaw.getHours() +
                ":" +
                theTimeRaw.getMinutes() +
                ":" +
                theTimeRaw.getSeconds();

              // Creating the best path for the screen width and satellite height

              // app.viewData.orbitConfig.degData.minDeg = ( app.viewData.guiwidth /340 ) * 4 + 15;
              // app.viewData.orbitConfig.degData.maxDeg = ( app.viewData.guiwidth /340 ) * 3 + 6.7;

              var degOffsetRange =
                (app.viewData.orbitConfig.degData.maxOffset -
                  app.viewData.orbitConfig.degData.minOffset) /
                100;
              var degSpinRange =
                (app.viewData.orbitConfig.degData.maxDeg -
                  app.viewData.orbitConfig.degData.minDeg) /
                100;
              var keyframeDegRaw =
                ((dataAlt - app.viewData.orbitConfig.degData.minOffset) /
                  degOffsetRange) *
                  degSpinRange -
                app.viewData.orbitConfig.degData.maxDeg;

              var keyframeDeg =
                (app.viewData.guiwidth - 1280) / 64 + Math.abs(keyframeDegRaw);

              if (dataDir != "left") {
                var keyFrame0 = "-" + keyframeDeg;
                var keyFrame100 = keyframeDeg;
              } else {
                var keyFrame0 = keyframeDeg;
                var keyFrame100 = "-" + keyframeDeg;
              }

              var displayAltRaw = dataAlt - 100;
              var displayAlt = Math.round(displayAltRaw * 1) / 1;
              var displaySpe = Math.round(dataSpe * 1) / 1;

              // Filing the data
              app.satData
                .find((x) => x.id === catid)
                .satellites.push({
                  name: current.satname,
                  id: current.satid,
                  birth: current.launchDate,
                  satlat: current.satlat,
                  satlng: current.satlng,
                  satalt: sataltround,
                  timestamp: theTime,
                  dataalt: dataAlt,
                  displayalt: displayAlt,
                  dataspe: dataSpe,
                  displayspe: displaySpe,
                  datadir: dataDir,
                  datadeg: dataDeg,
                  orbittype: orbitType,
                  saticon: satIcon,
                  keyframe0: keyFrame0,
                  keyframe100: keyFrame100,
                  catname: catName,
                });

              if (orbitType != "geosat") {
                // Creating the movment key keyframes
                var style = document.createElement("style");
                style.type = "text/css";
                style.className = "animation-catid-" + catid;
                style.innerHTML =
                  "@-webkit-keyframes orbit-" +
                  current.satid +
                  " {0% {transform: rotate(" +
                  keyFrame0 +
                  "deg);} 100% {transform: rotate(" +
                  keyFrame100 +
                  "deg);}}";
                document.getElementsByTagName("head")[0].appendChild(style);
              }
            });

            // How meny satellites were found? Lets add this to the btnData
            app.btnData.find((x) => x.id === catid).satcount =
              data.info.satcount;

            // Last of all, update the query quota as of this request
            app.otherData.queryquota = data.info.transactionscount;
          },
        });

        $.ajax({
          type: "GET",
          url:
            "https://us1.locationiq.com/v1/reverse.php?key=fc4cf0d9cfb68e&lat=" +
            app.userData.lat +
            "&lon=" +
            app.userData.lon +
            "&format=json",
          dataType: "json",
          success: function (data) {
            app.userData.house = data.address.house_number;
            app.userData.road = data.address.road;
            app.userData.city = data.address.county;
            app.userData.region = data.address.state;
            app.userData.country = data.address.country;
            app.userData.address =
              data.address.road + ", " + data.address.county;
          },
        });
      }
    },

    locationSearch: function () {
      var geoLookup = encodeURIComponent(app.userData.address);

      $.ajax({
        type: "GET",
        url:
          "https://us1.locationiq.com/v1/search.php?key=fc4cf0d9cfb68e&q=" +
          geoLookup +
          "&format=json",
        dataType: "json",
        success: function (data) {
          var latround = Math.round(data[0].lat * 10000) / 10000;
          var lonround = Math.round(data[0].lon * 10000) / 10000;
          app.userData.lat = latround;
          app.userData.lon = lonround;

          $.ajax({
            type: "GET",
            url:
              "https://us1.locationiq.com/v1/reverse.php?key=fc4cf0d9cfb68e&lat=" +
              latround +
              "&lon=" +
              lonround +
              "&format=json",
            dataType: "json",
            success: function (data) {
              app.userData.house = data.address.house_number;
              app.userData.road = data.address.road;
              app.userData.city = data.address.county;
              app.userData.region = data.address.state;
              app.userData.country = data.address.country;
              app.userData.address =
                data.address.road + ", " + data.address.county;
            },
          });
        },
      });
    },
  },

  watch: {
    satData: function (val, oldVal) {
      jQuery(document).ready(function ($) {
        $(".viewport-graphics .asat").hover(
          function () {
            $(".viewport-graphics .satellites").addClass("sat-hover");
            $(this).addClass("sat-hover");
          },

          function () {
            $(".viewport-graphics .satellites").removeClass("sat-hover");
            $(this).removeClass("sat-hover");
          }
        );
      });
    },
  },

  created: function () {
    navigator.geolocation.getCurrentPosition(function (position) {
      var latround = Math.round(position.coords.latitude * 10000) / 10000;
      var lonround = Math.round(position.coords.longitude * 10000) / 10000;
      app.userData.lat = latround;
      app.userData.lon = lonround;

      $.ajax({
        type: "GET",
        url:
          "https://us1.locationiq.com/v1/reverse.php?key=fc4cf0d9cfb68e&lat=" +
          latround +
          "&lon=" +
          lonround +
          "&format=json",
        dataType: "json",
        success: function (data) {
          app.userData.house = data.address.house_number;
          app.userData.road = data.address.road;
          app.userData.city = data.address.county;
          app.userData.region = data.address.state;
          app.userData.country = data.address.country;
          app.userData.address = data.address.road + ", " + data.address.county;
        },
      });
    });

    this.$nextTick(() => {
      app.viewData.winheight = window.innerHeight;
      app.viewData.winwidth = window.innerWidth;
      app.viewData.guiheight = jQuery(".viewport").outerHeight();
      app.viewData.guiwidth = jQuery(".viewport").outerWidth();

      if (app.viewData.winwidth < 1000) {
        app.viewData.smallscreen = true;
        app.userData.viewAng = 30;
        app.viewData.bodyclass =
          app.viewData.bodyclass + " fullviewport smallscreen";
      } else {
        app.viewData.smallscreen = false;
        app.userData.viewAng = 70;
        app.viewData.bodyclass = app.viewData.bodyclass.replace(
          "smallscreen",
          ""
        );
      }
    });
  },
});
