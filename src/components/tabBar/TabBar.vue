<template>
  <div class="tab-bar">
    <div v-if="isTicky" class="top">
      <img src="~assets/img/back.png" alt="" />
    </div>
    <div v-else class="button">
      <img src="~assets/img/back.png" alt="" />
      <div>{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {
      isTicky: true,
    };
  },
  components: {},
  methods: {},
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.tab-bar {
  position: fixed;
  top: 0;
  text-align: center;
  color: transparent;
  transition: all 0.3s ease;
  z-index: 11;
}
.tab-bar img {
  height: 30px;
  width: 30px;
}
.top {
  height: 30px;
  position: absolute;
  top: 5px;
  left: 5px;
  background-color: hsla(0, 0%, 100%, 0);
  z-index: 10;
}
.button {
  top: 0;
  line-height: 44px;
  height: 44px;
  color: #191a1b;
  background: #fff;
  display: flex;
  padding-left: 5px;
  margin-right: 35px;
  width: 100vw;
}
.button div {
  flex: 1;
  text-align: center;
}
.button img {
  margin-top: 5px;
}
</style>