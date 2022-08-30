/* eslint-disable array-callback-return */
import React from "react"
import { useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/scss"
import useSWR from "swr"
import MovieCard from "../components/movie/MovieCard"
import { fetcher, TMDB_API } from "../config/config"

const MovieDetailsPage = () => {
  const { movieId } = useParams()

  const { data } = useSWR(
    TMDB_API.getMovieDetails(movieId),
    fetcher
  )

  if (!data) return null
  const { backdrop_path, poster_path, title, genres, overview } = data

  return (
    <div className="pb-20 page-container">
      <div className="w-full h-[600px] relative mb-10">
        <div className="overlay absolute inset-0 bg-black bg-opacity-25"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${TMDB_API.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full max-w-[800px] h-[400px] mx-auto -mt-[200px] relative pb-20">
        <img
          src={TMDB_API.imageOriginal(poster_path)}
          alt=""
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <h1 className="text-center text-4xl text-white font-bold mb-10">
        {title}
      </h1>
      <div className="flex justify-center gap-5">
        {genres.length > 0 &&
          genres.map((item) => {
            return (
              <span
                key={item.id}
                className="border rounded-full p-3 flex items-center justify-center min-w-[141px] text-center border-[#7D6AFF] font-bold text-[#7D6AFF]"
              >
                {item.name}
              </span>
            )
          })}
      </div>
      <p className="pt-10 max-w-[700px] mx-auto leading-7 ">{overview}</p>
      <MovieCredit />
      <MovieVideo />
      <MovieSimilar />
    </div>
  )
}

export default MovieDetailsPage

function MovieCredit() {
  const { movieId } = useParams()

  const { data } = useSWR(
    TMDB_API.getMovieMeta(movieId, 'credits'),
    fetcher
  )
  if (!data) return null

  const { cast } = data

  if (!cast || cast.length <= 0) return null

  return (
    <div className="pt-10 text-center">
      <h2 className="text-3xl font-bold pb-10">Cast</h2>
      <div className="grid grid-cols-4 gap-10">
        {cast.map((item, index) => {
          if (index <= 3)
            return (
              <div key={item.id}>
                <img
                  src={TMDB_API.imageOriginal(item.profile_path)}
                  alt={item.original_name}
                  className="rounded-xl w-full h-[350px] object-cover mb-3"
                />
                <h3 className="text-xl font-medium">{item.name}</h3>
              </div>
            )
        })}
      </div>
    </div>
  )
}

function MovieVideo() {
  const { movieId } = useParams()
  const { data } = useSWR(
    TMDB_API.getMovieMeta(movieId, 'videos'),
    fetcher
  )

  if (!data) return null
  const {
    results
  } = data

  if (!results || results.length <= 0) return null

  return <div className="flex flex-col gap-10">
    {
      results.map((item, index) => {
        if (index <= 3)
          return (
            <div key={item.id}>
              <h3 className="mb-5 text-xl font-medium p-3 pl-0 text-secondary inline-block">{item.name}</h3>
              <div className="w-full aspect-video">
                <iframe width="1280" height="800" src={`https://www.youtube.com/embed/${item.key}`} title={`${item.name}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </div>
          )
      })
    }
  </div >
}

function MovieSimilar() {
  const { movieId } = useParams()
  const { data } = useSWR(
    TMDB_API.getMovieMeta(movieId, 'similar'),
    fetcher
  )

  if (!data) return null
  const { results } = data

  if (!results || results.length <= 0) return null

  return (
    <div className="pt-10">
      <h3 className="text-xl font-meidum p-3 pl-0">Similar movie</h3>
      <div className="movie-similar">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <MovieCard item={item} />
                </SwiperSlide>
              )
            })}
        </Swiper>
      </div>
    </div>
  )
}
