import React, { useEffect, useState } from "react"
import ReactPaginate from 'react-paginate'
import useSWR from "swr"
import MovieCard from "../components/movie/MovieCard"
import { fetcher, TMDB_API } from "../config/config"
import useDebounce from "../hooks/useDebounce"

// search
// https://api.themoviedb.org/3/search/movie?api_key=b2bfd7a8fd6001ec78e71956b1a29faa&language=en-US&page=1&include_adult=false

const itemsPerPage = 20
// const pageCount = 5

const MoviePage = () => {
  const [nextPage, setNextPage] = useState(1)
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [filter, setFilter] = useState('')
  const [url, setUrl] = useState(TMDB_API.getMovieList('popular', nextPage))
  const { data, error } = useSWR(
    url,
    fetcher
  )

  const loading = !data && !error

  const filterDebounce = useDebounce(filter, 1000)

  useEffect(() => {
    if (filterDebounce) {
      setUrl(TMDB_API.getMovieSearch(filterDebounce, nextPage))
    } else (
      setUrl(TMDB_API.getMovieList('popular', nextPage))
    )
  }, [filterDebounce, nextPage])

  // if (!data) return null
  const movies = data?.results || []
  // const { page, totalPage } = data

  const handleChangeFilter = (e) => {
    setFilter(e.target.value)
  }

  useEffect(() => {
    if (!data || !data.total_results) return
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1)
  };

  return (
    <div className="page-container">
      <div className="flex gap-x-5 py-10">
        <input
          type="text"
          className="w-full p-3 rounded-lg outline-none bg-slate-800 text-white "
          placeholder="Type here your search..."
          onChange={handleChangeFilter}
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
      {
        loading ? (<div className="w-10 h-10 rounded-full border-4 border-t-transparent border-primary border-t-4 mx-auto animate-spin"></div>) : (
          <div className="grid grid-cols-4 gap-10">
            {movies.length > 0 &&
              movies.map((item) => {
                return <MovieCard item={item} key={item.id} />
              })}
          </div>
        )
      }
      <div className="flex justify-center items-center gap-x-5 my-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <span className="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </span>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={
            <span className="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </span>
          }
          renderOnZeroPageCount={null}
          className='pagination'
        />
      </div>
    </div>
  )
}

export default MoviePage
