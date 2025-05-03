<template>
  <header>
    <div v-if="otherData.queryquota != 0" class="query-quota">
      <p>Query Quota: {{ otherData.queryquota }}/1000</p>
    </div>

    <div v-if="viewData.smallscreen != true && userData.address" class="user-address">
      <p>{{ userData.house }} {{ userData.road }}, {{ userData.city }}, {{ userData.country }}</p>
    </div>

    <div v-if="viewData.smallscreen == true && userData.address" class="user-address">
      <p>{{ userData.house }} {{ userData.road }}</p>
    </div>

    <div v-if="viewData.fullviewport != true && viewData.smallscreen != true" 
         @click="fullviewport" 
         class="fullviewport-toggle">
      <i class="fas fa-expand"></i>
    </div>

    <div v-if="viewData.fullviewport && viewData.smallscreen != true" 
         @click="fullviewport" 
         class="fullviewport-toggle">
      <i class="fas fa-compress"></i>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  inject: ['userData', 'viewData', 'otherData', 'fullviewport']
};
</script>
