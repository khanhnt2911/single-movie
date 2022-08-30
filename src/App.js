import { Fragment, lazy, Suspense } from "react"
import "swiper/scss"
import Banner from "./components/banner/Banner"
import { Route, Routes } from "react-router-dom"
import Main from "./components/layout/Main"
// import Homepage from "./pages/HomePage"
// import MoviePage from "./pages/MoviePage"
// import MovieDetailsPage from "./pages/MovieDetailsPage"

const Homepage = lazy(() => import("./pages/HomePage"))
const MoviePage = lazy(() => import("./pages/MoviePage"))
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"))

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
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
      </Suspense>
    </Fragment>
  )
}

export default App
