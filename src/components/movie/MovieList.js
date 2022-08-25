import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import MovieCard from "./MovieCard"
import "swiper/scss"
import useSWR from "swr"
import { fetcher } from "../../config/config"
// https://api.themoviedb.org/3/movie/550?api_key=b2bfd7a8fd6001ec78e71956b1a29faa
// https://api.themoviedb.org/3/movie/top_rated?api_key=&language=en-US&page=1
const MovieList = ({ type = "now_playing" }) => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=b2bfd7a8fd6001ec78e71956b1a29faa`,
    fetcher
  )

  const movies = data?.results || []

  return (
    <div className="movie-list pb-20">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <MovieCard item={item} />
              </SwiperSlide>
            )
          })}
      </Swiper>
    </div>
  )
}

export default MovieList
