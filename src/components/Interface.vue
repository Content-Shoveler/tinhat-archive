<template>
  <section id="interface" class="interface">
    <div class="mobilebtn" v-if="viewData.smallscreen" @click="openMenu">
      <i class="fas fa-bars"></i>
    </div>

    <div class="vcenter">
      <div class="vscroll">
        <div class="interface-group switchers toggler">
          <div class="switch">
            <p>View Mode</p>
            <p><input @click="activable($event) & openMenu()" type="checkbox" v-model="viewData.graphics" /></p>
          </div>
          <div class="switch">
            <p>Fullscreen</p>
            <p><input @click="activable($event) & fullscreen()" type="checkbox" v-model="viewData.fullscreen" /></p>
          </div>
        </div>

        <div class="interface-group sat-selectors">
          <ul>
            <li v-for="button in btnData" :key="button.id">
              <button @click="addSats($event)" 
                      :class="button.satcount !== '' ? 'active' : ''" 
                      :data-catid="button.id">
                <i v-if="button.saticon" :class="button.saticon"></i> 
                {{ button.displayName }} 
                <span v-if="button.satcount !== ''">{{ button.satcount }}</span>
                <i v-if="button.satloading" class="satloading fas fa-circle-notch"></i>
              </button>
            </li>
            <li>
              <button @click="removeAll">Remove All</button>
            </li>
          </ul>
        </div>

        <div class="interface-group location-search">
          <p class="useraddress">
            <input v-model="userData.address" />
            <button @click="locationSearch"><i class="fas fa-map-marker-alt"></i></button>
          </p>
        </div>

        <div class="interface-group location-config">
          <p>Latitude <input class="userlat" v-model="userData.lat" /></p>
          <p>Longitude <input class="userlon" v-model="userData.lon" /></p>
          <p>Altitude <input class="useralt" v-model="userData.alt" /></p>
          <p>Above Angle <input class="userang" v-model="userData.viewAng" /></p>
        </div>

        <div class="interface-group trythis">
          <p>
            <button @click="solarFlip">
              <i class="fas fa-sun"></i>Visit The Solar System
            </button>
          </p>
        </div>

        <div class="interface-group credits">
          <div>
            <p>
              <a href="https://wovenit.nz/" target="_blank">
                <img src="" alt="Woven IT Logo" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Interface',
  inject: [
    'viewData',
    'userData', 
    'btnData',
    'removeAll',
    'addSats', 
    'locationSearch',
    'fullscreen',
    'openMenu',
    'activable',
    'solarFlip'
  ]
};
</script>
