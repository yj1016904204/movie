<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-card v-for="item in soonMovies.films" :key="item.filmId">
        <template #title>
          <div class="title">{{ item.name | nameStr }}</div>
        </template>
        <template #desc>
          <div class="desc">
            <div>主演 : {{ item.actors | parseActors }}</div>
            <div>上映时间 : {{ item.premiereAt | premiereAtTime }}</div>
          </div>
        </template>
        <template #thumb>
          <img :src="item.poster" width="66" alt="" />
        </template>
        <template #tags>
          <van-tag
            plain
            class="buyTicket"
            size="large"
            color="#ffb232"
            type="danger"
            >预购</van-tag
          >
        </template>
      </van-card>
    </van-list>
  </div>
</template>

<script>
import Vue from "vue";
import { Card, Col, Row, Image, Tag, List } from "vant";

Vue.use(List);
Vue.use(Card);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tag);
Vue.use(Image);

import uri from "@/config/uri";
export default {
  name: "ComingSoon",
  data() {
    return {
      soonMovies: {
        films: [],
        pageNum: 0,
        pageSize: 10,
        cityId: 110100,
      },
      loading: false,
      finished: false,
    };
  },
  methods: {
    getSoonMovies() {
      const pageNum = this.soonMovies.pageNum + 1;
      this.$http({
        url: uri.getSoonList,
        params: {
          pageNum,
          pageSize: this.soonMovies.pageSize,
          cityId: this.soonMovies.cityId,
        },
      }).then((res) => {
        if (this.soonMovies.films.length < res.data.total) {
          this.soonMovies.films.push(...res.data.films);
          this.soonMovies.pageNum++;
          this.loading = false;
        } else {
          this.finished = true;
        }
      });
    },
    onLoad() {
      this.getSoonMovies();
    },
  },
  filters: {
    parseActors(actors) {
      let str = "";
      actors
        ? actors.forEach((item) => {
            str += item.name + " ";
          })
        : (str = "暂无演员");
      return str.length > 14 ? str.substr(0, 14) + "..." : str;
    },
    premiereAtTime(premiereAt) {
      const dt = new Date(premiereAt * 1000);
      const dataDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      let m = dt.getMonth() + 1;
      let d = dt.getDate();
      let day = dt.getDay();
      return dataDay[day] + " " + m + "月" + d + "日";
    },
    nameStr(name) {
      return name.length > 12 ? name.substr(0, 12) + "..." : name;
    },
  },
};
</script>

<style scoped>
.van-card__thumb {
  width: 70px;
}

.list-row {
  text-align: center;
}
.title {
  color: #191a1b;
  font-size: 16px;
  height: 22px;
  margin-top: 10px;
  line-height: 22px;
  overflow: hidden;
}
.van-card__thumb img {
  border-radius: 2px;
}

.desc {
  font-size: 13px;
  margin-top: 4px;
  color: #797d82;
  height: 22px;
  line-height: 22px;
}
.buyTicket {
  float: right;
  position: relative;
  top: -35px;
  color: #ffb232;
  font-size: 13px;
  font-weight: normal;
  border-radius: 2px;
}
</style>