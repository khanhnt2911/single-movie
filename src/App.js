import { Fragment } from "react"
import "swiper/scss"
import Banner from "./components/banner/Banner"
import { Route, Routes } from "react-router-dom"
import Main from "./components/layout/Main"
import Homepage from "./pages/HomePage"
import MoviePage from "./pages/MoviePage"
import MovieDetailsPage from "./pages/MovieDetailsPage"

function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={<Main />}>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Homepage />
              </>
            }
          ></Route>
          <Route path="/movies" element={<MoviePage />}></Route>
          <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
        </Route>
      </Routes>
    </Fragment>
  )
}

export default App
