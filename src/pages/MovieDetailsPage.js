/* eslint-disable array-callback-return */
import React from "react"
import { useParams } from "react-router-dom"
import useSWR from "swr"
import { API_KEY, fetcher } from "../config/config"

const MovieDetailsPage = () => {
  const { movieId } = useParams()

  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
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
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full max-w-[800px] h-[400px] mx-auto -mt-[200px] relative pb-20">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
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
      <MovieCast></MovieCast>
      <MovieVideo></MovieVideo>
    </div>
  )
}

export default MovieDetailsPage

function MovieCast() {
  const { movieId } = useParams()

  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
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
                  src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
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
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`,
    fetcher
  )
  if (!data) return null
  console.log(
    "🚀 ~ file: MovieDetailsPage.js ~ line 100 ~ MovieVideo ~ data",
    data
  )

  // <iframe width="1280" height="720" src="https://www.youtube.com/embed/b6wC02UKC68" title="MU chiến thắng ngày Ronaldo được cho dự bị | TỔ BUÔN 247 (23/08/2022)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

  return <div></div>
}
