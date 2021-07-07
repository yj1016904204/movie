import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import common from "./modules/common"
import films from "./modules/films"
import cinemas from "./modules/cinemas"
import news from "./modules/news"
import center from "./modules/center"




const routes = [
  ...common,
  ...films,
  ...cinemas,
  ...news,
  ...center
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
