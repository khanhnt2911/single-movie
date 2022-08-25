import React from "react"
import MovieList from "../components/movie/MovieList"

const HomePage = () => {
  return (
    <div>
      <section className="movies-layout">
        <h2 className="capitalize text-white font-bold mb-5 text-3xl ">
          Now playing
        </h2>
        <MovieList />
      </section>
      <section className="movies-layout">
        <h2 className="capitalize text-white font-bold mb-5 text-3xl ">
          Top rating
        </h2>
        <MovieList type="top_rated" />
      </section>
      <section className="movies-layout">
        <h2 className="capitalize text-white font-bold mb-5 text-3xl ">
          Popular
        </h2>
        <MovieList type="popular" />
      </section>
    </div>
  )
}

export default HomePage
