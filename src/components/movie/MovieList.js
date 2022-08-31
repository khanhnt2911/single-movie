import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import MovieCard from "./MovieCard"
import "swiper/scss"
import useSWR from "swr"
import { fetcher, MDB_API } from "../../config/config"

const MovieList = ({ type = "now_playing" }) => {
  const { data } = useSWR(MDB_API.getMovieList(type), fetcher)

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
