<template>
  <div class="content">
    <div :class="{ sticky: isSticky }">
      <van-tabs
        v-model="active"
        line-width="60px"
        title-active-color="#ff5f16"
        color="#ff5f16"
        line-height="2px"
        height="49"
      >
        <van-tab title="正在热映" to="/films/nowPlaying"> </van-tab>
        <van-tab title="即将上映" to="/films/comingSoon"> </van-tab>
      </van-tabs>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";
Vue.use(Tab);
Vue.use(Tabs);

import NowPlaying from "./NowPlaying.vue";
import ComingSoon from "./ComingSoon.vue";

export default {
  name: "Index",
  data() {
    return {
      active: 0,
      url: ["/films/nowPlaying", "/films/comingSoon"],
      isSticky: true,
    };
  },
  components: {
    NowPlaying,
    ComingSoon,
  },
  created() {
    let path = this.$route.path;
    this.active = this.url.indexOf(path) != -1 ? this.url.indexOf(path) : 0;
  },
  mounted() {
    addEventListener("scroll", () => {
      let scrollTop = document.documentElement.scrollTop;
      scrollTop > 200 ? (this.isSticky = true) : (this.isSticky = false);
    });
  },
};
</script>

<style scoped>
.sticky {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.content {
  margin-bottom: 50px;
}
</style>