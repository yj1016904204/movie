<template>
  <div>
    <van-tabbar
      v-model="active"
      active-color="#ee0a24"
      inactive-color="#000"
      @change="onChange"
    >
      <van-tabbar-item>
        <van-icon slot="icon" class="iconfont icon-dianying" />
        <span>电影</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <van-icon slot="icon" class="iconfont icon-yingyuan" />
        <span>影院</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <van-icon slot="icon" class="iconfont icon-zixun" />
        <span>咨询</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <van-icon slot="icon" class="iconfont icon-wode" />
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import "assets/fonts/iconfont.css";
import Vue from "vue";
import { Tabbar, TabbarItem, Icon } from "vant";

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
export default {
  name: "GlobalNavBar",
  data() {
    return {
      active: 0,
      url: ["/films/nowPlaying", "/cinemas", "/infomarions", "/center"],
    };
  },
  components: {},
  methods: {
    onChange() {
      this.$router.push(this.url[this.active]);
    },
  },
  created() {
    let path = this.$route.path;
    this.active = this.url.indexOf(path) != -1 ? this.url.indexOf(path) : 0;
  },
};
</script>

<style scoped>
</style>