<template>
  <div class="detail">
    <TabBar :title="filmInfo['name']" ref="tabBar" />
    <div class="title-img">
      <img :src="filmInfo.poster" alt="" class="topImg" />
      <div class="desc">
        <div class="col">
          <div class="col-name">{{ filmInfo.name }}</div>
          <div class="grade" v-if="filmInfo.grade">
            <span>{{ filmInfo.grade }}</span
            >分
          </div>
        </div>
        <div class="grey-text">{{ filmInfo.category }}</div>
        <div class="grey-text">
          {{ filmInfo.premiereAt | premiereAtTime }}上映
        </div>
        <div class="grey-text">
          {{ filmInfo.nation }} | {{ filmInfo.runtime }}分钟
        </div>
        <div class="grey-text hidde">{{ filmInfo.synopsis }}</div>
      </div>
    </div>
    <div class="actors">
      <div class="actors-title">演职人员</div>
      <div>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in filmInfo.actors"
              :key="index"
            >
              <div class="actors-img">
                <img :src="item.avatarAddress" width="85" :alt="item.name" />
              </div>
              <div class="actors-name">{{ item.name }}</div>
              <div class="actors-role">{{ item.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="photos">
      <div class="photos-title">剧照</div>
      <div>
        <div class="swiper-container1">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in filmInfo.photos"
              :key="index"
            >
              <div class="photos-img">
                <img :src="item" width="150" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="buyTicket">
      <button>选座购票</button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Swiper from "swiper";
import "swiper/swiper-bundle.min.css";

import uri from "@/config/uri";

import TabBar from "components/tabBar/TabBar";
export default {
  name: "Detail",
  data() {
    return {
      filmInfo: {},
    };
  },
  created() {
    const fileId = this.$route.params.filmId;
    this.$http(uri.getDetail + "?filmId=" + fileId).then((res) => {
      if (res.status === 0) {
        this.filmInfo = res.data.film;
        console.log(this.filmInfo);

        this.$nextTick(() => {
          new Swiper(".swiper-container", {
            slidesPerView: 4,
            spaceBetween: 30,
          });
        });
        this.$nextTick(() => {
          new Swiper(".swiper-container1", {
            slidesPerView: 2.3,
            spaceBetween: 10,
          });
        });
      } else {
        alert(错误参数);
        this.$router.push("/films/nowPlaying");
      }
    });
  },
  components: {
    TabBar,
  },
  mounted() {
    addEventListener("scroll", () => {
      let scroll = document.documentElement.scrollTop;

      this.$refs.tabBar.isTicky = scroll < 20;

      // this.$refs.tabBar.isTicky = true;
    });
  },
  filters: {
    premiereAtTime(premiereAtTime) {
      return moment(premiereAtTime * 1000).format("YYYY-MM-DD");
    },
  },
};
</script>

<style scoped>
.detail {
  position: sticky;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  background: rgba(100, 100, 100, 0.1);
  margin-bottom: 49px;
}
.topImg {
  width: 100%;
}
.title-img {
  position: relative;
  height: 400px;
  overflow: hidden;
}
.desc {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 15px;
  padding-top: 12px;
  background-color: #fff;
  width: calc(100% - 30px);
  height: 168px;
  line-height: 22px;
}
.desc .col {
  display: flex;
}
.col .col-name {
  flex: 4;
  color: #191a1b;
  font-size: 18px;
  height: 24px;
  line-height: 24px;
  margin-right: 7px;
}
.col .grade {
  flex: 2;
  text-align: right;
  color: #ffb232;
  font-size: 10px;
}
.col .grade span {
  font-size: 18px;
  font-style: italic;
}
.grey-text {
  font-size: 13px;
  color: #797d82;
  margin-top: 4px;
}
.hidde {
  margin-top: 10px;
  height: 40px !important;
  overflow: hidden;
}
.actors {
  margin-top: 10px;
  background: #fff;
  padding-left: 10px;
  text-align: center;
}
.actors-title {
  padding: 15px;
  font-size: 16px;
  text-align: left;
  color: #191a1b;
  height: 22.5px;
  line-height: 22px;
}
.actors-name {
  padding-top: 10px;
  font-size: 12px;
  color: #191a1b;
  width: 85px;
  height: 18px;
}
.actors-role {
  font-size: 10px;
  color: #797d82;
}
.actors-img {
  width: 85px;
  height: 85px;
  overflow: hidden;
}
.photos {
  margin-top: 10px;
  background: #fff;
  padding-left: 10px;
  padding-bottom: 20px;
  overflow: hidden;
}
.photos-title {
  height: 62px;
  width: 100%;
  padding: 15px 0;
  font-size: 16px;
  color: #191a1b;
  height: 22.5px;
  line-height: 22px;
}
.buyTicket {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 49px;
  width: 100%;
  text-align: center;
  background-color: #ff5f16;
  color: #fff;
  font-size: 16px;
  line-height: 49px;
  z-index: 10;
}
button {
  background: transparent;
  border: 0;
}
</style>