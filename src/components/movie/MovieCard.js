import React from "react"
import { useNavigate } from "react-router-dom"
import { TMDB_API } from "../../config/config"
import Button from "../button/Button"
import PropTypes from 'prop-types'

const MovieCard = ({ item }) => {
  const { title, vote_average, poster_path, release_date, id } = item
  const navigate = useNavigate()

  return (
    <div className="movie-card flex flex-col h-full rounded-lg p-3 bg-slate-800 text-white selection-none">
      <img
        src={TMDB_API.image500(poster_path)}
        alt=""
        className="w-full h-[250px] rounded-lg object-cover mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className=" font-bold text-xl mb-3">{title}</h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)} bgColor={'primary'} wfull>Watch now</Button>
      </div>
    </div >
  )
}

MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string, vote_average: PropTypes.number, poster_path: PropTypes.string, release_date: PropTypes.string, id: PropTypes.string
  })
}

export default MovieCard
