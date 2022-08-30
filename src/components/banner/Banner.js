import useSWR from "swr"
import { Swiper, SwiperSlide } from "swiper/react"
import React from "react"
import { fetcher } from "../../config/config"
import Button from "../button/Button"
import { useNavigate } from "react-router-dom"

const Banner = ({ type = "now_playing" }) => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=b2bfd7a8fd6001ec78e71956b1a29faa`,
    fetcher
  )
  const movies = data?.results || []

  return (
    <div className="banner h-[500px] page-container mb-20">
      <Swiper>
        {movies.length > 0 &&
          movies.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <BannerItem item={item} />
              </SwiperSlide>
            )
          })}
      </Swiper>
    </div>
  )
}

function BannerItem({ item }) {
  const { title, poster_path, id } = item
  const navigate = useNavigate()

  return (
    <div className="banner h-[500px] page-container mb-20">
      <div className="w-full h-full rounded-lg relative">
        <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt=""
          className="w-full h-full object-cover object-top rounded-lg"
        />
        <div className="content absolute left-5 bottom-5 w-full text-white">
          <h2 className="font-bold text-3xl mb-5">{title}</h2>
          <div className="flex items-center gap-x-3 mb-8">
            <span className="px-4 py-2 border border-white rounded-lg">
              Adventures
            </span>
            <span className="px-4 py-2 border border-white rounded-lg">
              Adventures
            </span>
            <span className="px-4 py-2 border border-white rounded-lg">
              Adventures
            </span>
          </div>
          <Button onClick={() => navigate(`/movie/${id}`)}>Watch now</Button>
        </div>
      </div>
    </div>
  )
}

export default Banner
