import FilmsIndex from "views/Films/Index"
import NowPlaying from "views/Films/NowPlaying"
import ComingSoon from "views/Films/ComingSoon"
import Detail from "views/Films/Detail"

const router = [
  {
    path: "/films",
    component: FilmsIndex,
    children: [
      {
        path: "nowPlaying", component: NowPlaying
      },
      {
        path: "comingSoon", component: ComingSoon
      }
    ]
  },
  {
    path: "/film/:filmId",
    component: Detail
  }
]

export default router