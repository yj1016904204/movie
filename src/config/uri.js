//请求地址统一配置文件
const prefix = "/api/"

const uri = {
  //获取正在热映的列表数据
  getNowList: prefix + "getNowPlayingFilmList",
  //获取即将上映的列表数据
  getSoonList: prefix + "getComingSoonFilmList",
  getDetail: prefix + "getFilmInfo"
}

export default uri