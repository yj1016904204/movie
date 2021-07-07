<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-card
        v-for="item in nowMovies.films"
        :key="item.filmId"
        @click="getFilmId(item.filmId)"
      >
        <template #title>
          <div class="title">{{ item.name }}</div>
        </template>
        <template #desc>
          <div class="desc">
            <div style="height: 14px">
              <div v-show="item.grade">
                观众评分 <span class="grade">{{ item.grade }}</span>
              </div>
            </div>
            <div>主演 : {{ item.actors | parseActors }}</div>
            <div>{{ item.nation | nationStr }} | {{ item.runtime }}分钟</div>
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
            color="#ff5f16"
            type="danger"
            >购票</van-tag
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
  name: "NowPlaying",
  data() {
    return {
      nowMovies: {
        films: [],
        pageNum: 0,
        pageSize: 10,
        cityId: 110100,
      },
      loading: false,
      finished: false,
    };
  },
  /*   created() {
    this.getNowMovies();
  }, */
  methods: {
    getNowMovies() {
      const pageNum = this.nowMovies.pageNum + 1;
      this.$http({
        url: uri.getNowList,
        params: {
          pageNum,
          pageSize: this.nowMovies.pageSize,
          cityId: this.nowMovies.cityId,
        },
      }).then((res) => {
        let maxPage = Math.ceil(res.data.total / 10);
        if (this.nowMovies.films.length < res.data.total) {
          this.nowMovies.films.push(...res.data.films);
          this.nowMovies.pageNum++;
          this.loading = false;
        } else {
          this.finished = true;
        }
      });
    },
    onLoad() {
      this.getNowMovies();
    },
    getFilmId(filmId) {
      this.$router.push("/film/" + filmId);
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
    nationStr(nation) {
      return nation.length > 10 ? nation.substr(0, 10) + "..." : nation;
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
}
.van-card__thumb img {
  border-radius: 2px;
  overflow: hidden;
}
.grade {
  color: #ffb232;
  font-size: 14px;
}
.desc {
  font-size: 13px;
  margin-top: 4px;
  color: #797d82;
}
.buyTicket {
  float: right;
  position: relative;
  top: -35px;
}
</style>