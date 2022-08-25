import React from "react"
import useSWR from "swr"
import MovieCard from "../components/movie/MovieCard"
import { fetcher } from "../config/config"

const MoviePage = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/popular?api_key=b2bfd7a8fd6001ec78e71956b1a29faa`,
    fetcher
  )

  const movies = data?.results || []

  return (
    <div>
      <div className="flex gap-x-5 py-10">
        <input
          type="text"
          className="w-full p-3 border rounded-lg outline-none "
          placeholder="Type here your search..."
        />
        <button className="text-white bg-primary p-3 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-10">
        {movies.length > 0 &&
          movies.map((item) => {
            return <MovieCard item={item} key={item.id} />
          })}
      </div>
    </div>
  )
}

export default MoviePage
