<template>
  <div id="app">
    <router-view></router-view>
    <global-nav-bar></global-nav-bar>
  </div>
</template>

<script>
import GlobalNavBar from "components/Nav/GlobalNavBar";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    GlobalNavBar,
  },
  methods: {},
};
</script>

<style scoped>
</style>