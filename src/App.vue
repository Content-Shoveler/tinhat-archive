<template>
  <div id="tinhatapp" :class="viewData.bodyclass">
    <div class="normal" v-if="viewData.ssview !== true">
      <Header />
      <Viewport />
      <Interface />
    </div>

    <div class="solview" v-if="viewData.ssview === true">
      <div class="tempstars">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>
      <button @click="solarFlip"><i class="fas fa-satellite"></i>Play With Satellites</button>
      <iframe src="https://solarsystem.nz/"></iframe>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Viewport from './components/Viewport.vue';
import Interface from './components/Interface.vue';
import satelliteApi from './services/satelliteApi';
import geocodingApi from './services/geocodingApi';

export default {
  name: 'App',
  components: {
    Header,
    Viewport,
    Interface
  },
  provide() {
    return {
      viewData: this.viewData,
      userData: this.userData,
      satData: this.satData,
      btnData: this.btnData,
      otherData: this.otherData,
      removeAll: this.removeAll,
      solarFlip: this.solarFlip,
      fullscreen: this.fullscreen,
      fullviewport: this.fullviewport,
      openMenu: this.openMenu,
      activable: this.activable,
      addSats: this.addSats,
      locationSearch: this.locationSearch
    };
  },
  data() {
    return {
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
        house: "",
        road: "",
        city: "",
        region: "",
        country: ""
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
          name: "experimental",
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
      }
    };
  },
  methods: {
    removeAll() {
      this.satData = [];
      this.btnData.map(function(x) {
        x.satcount = "";
        return x;
      });
    },

    solarFlip() {
      if (this.viewData.ssview != true) {
        this.viewData.bodyclass = this.viewData.bodyclass + " solarflip";
        this.viewData.ssview = true;
      } else {
        this.viewData.bodyclass = this.viewData.bodyclass.replace(
          "solarflip",
          ""
        );
        this.viewData.ssview = false;
      }
    },

    fullscreen() {
      if (this.viewData.fullscreen != true) {
        this.viewData.bodyclass = this.viewData.bodyclass + " fullscreen";
        this.viewData.fullscreen = true;
        document.body.requestFullscreen();
      } else {
        this.viewData.bodyclass = this.viewData.bodyclass.replace(
          "fullscreen",
          ""
        );
        this.viewData.fullscreen = false;
        document.exitFullscreen();
      }
    },

    fullviewport() {
      if (this.viewData.fullviewport != true) {
        this.viewData.bodyclass = this.viewData.bodyclass + " fullviewport";
        this.viewData.fullviewport = true;
      } else {
        this.viewData.bodyclass = this.viewData.bodyclass.replace(
          "fullviewport",
          ""
        );
        this.viewData.fullviewport = false;
      }
    },

    openMenu() {
      if (this.viewData.smallscreen != false) {
        if (this.viewData.openmenu != true) {
          this.viewData.bodyclass = this.viewData.bodyclass + " openmenu";
          this.viewData.openmenu = true;
        } else {
          this.viewData.bodyclass = this.viewData.bodyclass.replace(
            "openmenu",
            ""
          );
          this.viewData.openmenu = false;
        }
      }
    },

    activable(event) {
      if (event.currentTarget.className == "") {
        event.currentTarget.className = "active";
      } else {
        event.currentTarget.className = "";
      }
    },

    addSats(event) {
      // Refresh Viewport size
      this.viewData.guiheight = document.querySelector(".viewport").offsetHeight;
      this.viewData.guiwidth = document.querySelector(".viewport").offsetWidth;

      // What satellite category was this button for?
      const catid = event.currentTarget.getAttribute("data-catid");

      // Wait, is this category already active?
      if (event.currentTarget.className == "active") {
        // Yes? Then deactivate it and remove its satellites
        this.btnData.find((x) => x.id === catid).satloading = false;
        this.btnData.find((x) => x.id === catid).satcount = "";
        this.satData = this.satData.filter(function(obj) {
          return obj.id !== catid;
        });
        document.querySelectorAll(`.animation-catid-${catid}`).forEach(el => el.remove());
      } else {
        // No? Then lets set it to active and load some stuff!
        this.btnData.find((x) => x.id === catid).satloading = true;
        
        satelliteApi.getSatellitesAbove(
          this.userData.lat,
          this.userData.lon,
          this.userData.alt,
          this.userData.viewAng,
          catid
        ).then(response => {
          const data = response.data;
          
          // We have loaded!
          this.btnData.find((x) => x.id === catid).satloading = false;

          // Making the category name code friendly - this is just record keeping for dev, can be removed
          const catName = data.info.category.replace(/ /g, "-").toLowerCase();

          // Creating a parent object and array for this category
          this.satData.push({
            name: catName,
            id: catid,
            satcount: data.info.satcount,
            satellites: [],
          });

          // Getting the icons & display name
          const satIcon = this.btnData.find((x) => x.id === catid).saticon;

          // Adding the satellites as object to the above created array
          data.above.forEach(current => {
            // Set a random direction, left or right
            const dataAniRaw = Math.random() >= 0.5;
            const dataDir = dataAniRaw ? "left" : "right";

            // Mathing out the relative height
            const sataltround = Math.round(current.satalt * 1) / 1;

            // Low Orbit Math ---
            const lowRangeOrbitKM = this.viewData.orbitConfig.lowOrbit.maxKM - this.viewData.orbitConfig.lowOrbit.minKM;
            const lowRangeOrbitVH = this.viewData.orbitConfig.lowOrbit.maxVH - this.viewData.orbitConfig.lowOrbit.minVH;
            const low = Math.round((lowRangeOrbitVH * ((sataltround - this.viewData.orbitConfig.lowOrbit.minKM) / lowRangeOrbitKM) + this.viewData.orbitConfig.lowOrbit.minVH) * 10000) / 10000;

            // Geostationary Orbit Math ---
            const geoRangeOrbitKM = this.viewData.orbitConfig.geoOrbit.maxKM - this.viewData.orbitConfig.geoOrbit.minKM;
            const geoRangeOrbitVH = this.viewData.orbitConfig.geoOrbit.maxVH - this.viewData.orbitConfig.geoOrbit.minVH;
            const geo = Math.round((geoRangeOrbitVH * ((sataltround - this.viewData.orbitConfig.geoOrbit.minKM) / geoRangeOrbitKM) + this.viewData.orbitConfig.geoOrbit.minVH) * 10000) / 10000;

            // Medium Earth Orbit Math ---
            const medRangeOrbitKM = this.viewData.orbitConfig.medOrbit.maxKM - this.viewData.orbitConfig.medOrbit.minKM;
            const medRangeOrbitVH = this.viewData.orbitConfig.medOrbit.maxVH - this.viewData.orbitConfig.medOrbit.minVH;
            const med = Math.round((medRangeOrbitVH * ((sataltround - this.viewData.orbitConfig.medOrbit.minKM) / medRangeOrbitKM) + this.viewData.orbitConfig.medOrbit.minVH) * 10000) / 10000;

            // High Orbit Math ---
            const highRangeOrbitKM = this.viewData.orbitConfig.highOrbit.maxKM - this.viewData.orbitConfig.highOrbit.minKM;
            const highRangeOrbitVH = this.viewData.orbitConfig.highOrbit.maxVH - this.viewData.orbitConfig.highOrbit.minVH;
            const high = Math.round((highRangeOrbitVH * ((sataltround - this.viewData.orbitConfig.highOrbit.minKM) / highRangeOrbitKM) + this.viewData.orbitConfig.highOrbit.minVH) * 10000) / 10000;

            // Vhigh Orbit Math ---
            const vhighRangeOrbitKM = this.viewData.orbitConfig.vhighOrbit.maxKM - this.viewData.orbitConfig.vhighOrbit.minKM;
            const vhighRangeOrbitVH = this.viewData.orbitConfig.vhighOrbit.maxVH - this.viewData.orbitConfig.vhighOrbit.minVH;
            const vhigh = Math.round((vhighRangeOrbitVH * ((sataltround - this.viewData.orbitConfig.vhighOrbit.minKM) / vhighRangeOrbitKM) + this.viewData.orbitConfig.vhighOrbit.minVH) * 10000) / 10000;

            // ISS Orbit Math ---
            const issRangeOrbitKM = this.viewData.orbitConfig.issOrbit.maxKM - this.viewData.orbitConfig.issOrbit.minKM;
            const issRangeOrbitVH = this.viewData.orbitConfig.issOrbit.maxVH - this.viewData.orbitConfig.issOrbit.minVH;
            const iss = Math.round((issRangeOrbitVH * ((sataltround - this.viewData.orbitConfig.issOrbit.minKM) / issRangeOrbitKM) + this.viewData.orbitConfig.issOrbit.minVH) * 10000) / 10000;

            // Initialize variables
            let dataAlt = 0;
            let dataDeg = "";
            let orbitType = "other";
            let dataSpe = 0;

            // Is it geostationary, low earth or really high?
            if (sataltround > this.viewData.orbitConfig.geoOrbit.minTag && sataltround < this.viewData.orbitConfig.geoOrbit.maxTag) {
              orbitType = "geosat";
              let newDataDir = "no";
              dataAlt = geo;
              dataDeg = Math.round((this.viewData.smallscreen ? Math.random() * (-8 - 8) + 8 : Math.random() * (-20 - 20) + 20) * 1000) / 1000;
            } else if (sataltround < this.viewData.orbitConfig.lowOrbit.maxTag) {
              orbitType = "low";
              dataAlt = low;
            } else if (sataltround > this.viewData.orbitConfig.medOrbit.minTag && sataltround < this.viewData.orbitConfig.geoOrbit.minTag) {
              orbitType = "med";
              dataAlt = med;
            } else if (sataltround > this.viewData.orbitConfig.geoOrbit.maxTag && sataltround < this.viewData.orbitConfig.medOrbit.maxTag) {
              orbitType = "med";
              dataAlt = med;
            } else if (sataltround > this.viewData.orbitConfig.highOrbit.minTag && sataltround < this.viewData.orbitConfig.highOrbit.maxTag) {
              orbitType = "high";
              dataAlt = high;
            } else if (sataltround > this.viewData.orbitConfig.vhighOrbit.minTag && sataltround < this.viewData.orbitConfig.vhighOrbit.maxTag) {
              orbitType = "vhigh";
              dataAlt = vhigh;
            } else if (sataltround > this.viewData.orbitConfig.issOrbit.minTag) {
              orbitType = "iss";
              dataAlt = iss;
            } else {
              orbitType = "other";
              dataAlt = 0;
            }

            // Mathing out the relative speed
            const speedOrbitMaxLow = 15000;
            const speedOrbitMinLow = 5000;
            const speedSecMaxLow = 50;
            const speedSecMinLow = 20;
            const lowSpeed = Math.round(((speedSecMaxLow - speedSecMinLow) * ((sataltround - speedOrbitMinLow) / (speedOrbitMaxLow - speedOrbitMinLow)) + speedSecMinLow) * 10000) / 10000;

            const speedOrbitMaxMed = 60000;
            const speedOrbitMinMed = 20000;
            const speedSecMaxMed = 40;
            const speedSecMinMed = 20;
            const medSpeed = Math.round(((speedSecMaxMed - speedSecMinMed) * ((sataltround - speedOrbitMinMed) / (speedOrbitMaxMed - speedOrbitMinMed)) + speedSecMinMed) * 10000) / 10000;

            const speedOrbitMaxHigh = 200000;
            const speedOrbitMinHigh = 100000;
            const speedSecMaxHigh = 100;
            const speedSecMinHigh = 50;
            const highSpeed = Math.round(((speedSecMaxHigh - speedSecMinHigh) * ((sataltround - speedOrbitMinHigh) / (speedOrbitMaxHigh - speedOrbitMinHigh)) + speedSecMinHigh) * 10000) / 10000;

            const speedOrbitMaxVhigh = 900000;
            const speedOrbitMinVhigh = 100000;
            const speedSecMaxVhigh = 70;
            const speedSecMinVhigh = 40;
            const vhighSpeed = Math.round(((speedSecMaxVhigh - speedSecMinVhigh) * ((sataltround - speedOrbitMinVhigh) / (speedOrbitMaxVhigh - speedOrbitMinVhigh)) + speedSecMinVhigh) * 10000) / 10000;

            const speedOrbitMaxIss = 100000000000000000000000000000000;
            const speedOrbitMinIss = 100000;
            const speedSecMaxIss = 200;
            const speedSecMinIss = 100;
            const issSpeed = Math.round(((speedSecMaxIss - speedSecMinIss) * ((sataltround - speedOrbitMinIss) / (speedOrbitMaxIss - speedOrbitMinIss)) + speedSecMinIss) * 10000) / 10000;

            if (orbitType == "low") {
              dataSpe = lowSpeed;
            } else if (orbitType == "med") {
              dataSpe = medSpeed;
            } else if (orbitType == "high") {
              dataSpe = highSpeed;
            } else if (orbitType == "vhigh") {
              dataSpe = vhighSpeed;
            } else if (orbitType == "iss") {
              dataSpe = issSpeed;
            } else {
              dataSpe = vhighSpeed;
            }

            // Creating a timestamp
            const theTimeRaw = new Date();
            const theTime = theTimeRaw.getHours() + ":" + theTimeRaw.getMinutes() + ":" + theTimeRaw.getSeconds();

            // Creating the best path for the screen width and satellite height
            const degOffsetRange = (this.viewData.orbitConfig.degData.maxOffset - this.viewData.orbitConfig.degData.minOffset) / 100;
            const degSpinRange = (this.viewData.orbitConfig.degData.maxDeg - this.viewData.orbitConfig.degData.minDeg) / 100;
            const keyframeDegRaw = ((dataAlt - this.viewData.orbitConfig.degData.minOffset) / degOffsetRange) * degSpinRange - this.viewData.orbitConfig.degData.maxDeg;

            const keyframeDeg = (this.viewData.guiwidth - 1280) / 64 + Math.abs(keyframeDegRaw);

            let keyFrame0, keyFrame100;
            if (dataDir != "left") {
              keyFrame0 = "-" + keyframeDeg;
              keyFrame100 = keyframeDeg;
            } else {
              keyFrame0 = keyframeDeg;
              keyFrame100 = "-" + keyframeDeg;
            }

            const displayAltRaw = dataAlt - 100;
            const displayAlt = Math.round(displayAltRaw * 1) / 1;
            const displaySpe = Math.round(dataSpe * 1) / 1;

            // Filing the data
            this.satData.find((x) => x.id === catid).satellites.push({
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
              // Creating the movement key keyframes
              const style = document.createElement("style");
              style.type = "text/css";
              style.className = "animation-catid-" + catid;
              style.innerHTML = `@-webkit-keyframes orbit-${current.satid} {0% {transform: rotate(${keyFrame0}deg);} 100% {transform: rotate(${keyFrame100}deg);}}`;
              document.getElementsByTagName("head")[0].appendChild(style);
            }
          });

          // How many satellites were found? Lets add this to the btnData
          this.btnData.find((x) => x.id === catid).satcount = data.info.satcount;

          // Last of all, update the query quota as of this request
          this.otherData.queryquota = data.info.transactionscount;
        });

        geocodingApi.reverseGeocode(this.userData.lat, this.userData.lon).then(response => {
          const data = response.data;
          this.userData.house = data.address.house_number;
          this.userData.road = data.address.road;
          this.userData.city = data.address.county;
          this.userData.region = data.address.state;
          this.userData.country = data.address.country;
          this.userData.address = data.address.road + ", " + data.address.county;
        });
      }
    },

    locationSearch() {
      geocodingApi.searchLocation(this.userData.address).then(response => {
        const data = response.data;
        const latround = Math.round(data[0].lat * 10000) / 10000;
        const lonround = Math.round(data[0].lon * 10000) / 10000;
        this.userData.lat = latround;
        this.userData.lon = lonround;

        geocodingApi.reverseGeocode(latround, lonround).then(response => {
          const data = response.data;
          this.userData.house = data.address.house_number;
          this.userData.road = data.address.road;
          this.userData.city = data.address.county;
          this.userData.region = data.address.state;
          this.userData.country = data.address.country;
          this.userData.address = data.address.road + ", " + data.address.county;
        });
      });
    }
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latround = Math.round(position.coords.latitude * 10000) / 10000;
        const lonround = Math.round(position.coords.longitude * 10000) / 10000;
        this.userData.lat = latround;
        this.userData.lon = lonround;

        geocodingApi.reverseGeocode(latround, lonround).then(response => {
          const data = response.data;
          this.userData.house = data.address.house_number;
          this.userData.road = data.address.road;
          this.userData.city = data.address.county;
          this.userData.region = data.address.state;
          this.userData.country = data.address.country;
          this.userData.address = data.address.road + ", " + data.address.county;
        });
      });
    }

    this.viewData.winheight = window.innerHeight;
    this.viewData.winwidth = window.innerWidth;
    
    this.$nextTick(() => {
      this.viewData.guiheight = document.querySelector(".viewport")?.offsetHeight || 0;
      this.viewData.guiwidth = document.querySelector(".viewport")?.offsetWidth || 0;

      if (this.viewData.winwidth < 1000) {
        this.viewData.smallscreen = true;
        this.userData.viewAng = 30;
        this.viewData.bodyclass = this.viewData.bodyclass + " fullviewport smallscreen";
      } else {
        this.viewData.smallscreen = false;
        this.userData.viewAng = 70;
        this.viewData.bodyclass = this.viewData.bodyclass.replace("smallscreen", "");
      }
    });
  },
  watch: {
    satData: {
      handler() {
        this.$nextTick(() => {
          const asats = document.querySelectorAll(".viewport-graphics .asat");
          asats.forEach(asat => {
            asat.addEventListener("mouseenter", () => {
              document.querySelector(".viewport-graphics .satellites").classList.add("sat-hover");
              asat.classList.add("sat-hover");
            });
            
            asat.addEventListener("mouseleave", () => {
              document.querySelector(".viewport-graphics .satellites").classList.remove("sat-hover");
              asat.classList.remove("sat-hover");
            });
          });
        });
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
@use '@/assets/scss/stars' as *;
@use '@/assets/scss/style' as *;
</style>
