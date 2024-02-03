import {useState, useEffect} from 'react'
import {BsPlayFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {TailSpin} from 'react-loader-spinner'
import Header from '../Header'
import TrendingSection from '../TrendingSection/index'
import TopRatedSection from '../TopRatedSection/index'
import VideosSlider from '../VideosSlider/index'
import FooterSection from '../FooterSection/index'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const HomeSection = () => {
  const [originalsData, setOriginalsData] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  useEffect(() => {
   getOriginalsData()
  }, [])
 
  const getOriginalsData = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')
   // console.log(jwtToken)
    const originalsApiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(originalsApiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachMovie => ({
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      setOriginalsData(updatedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const renderPosterSuccessView = () => {
    const randomNumber = Math.floor(Math.random() * (originalsData.length - 1))
    const posterImage = originalsData[randomNumber]

    return (
      <div
        style={{backgroundImage: `url(${posterImage.backdropPath})`}}
        className="bg-image"
      >
        <Header />
        <div className="movie-heading-container">
          <h1 className="poster-title">{posterImage.title}</h1>
          <p className="poster-description">{posterImage.overview}</p>
          <button type="button" className="play-button">
            <BsPlayFill size={26} />
            <span>Play</span>
          </button>
        </div>
      </div>
    )
  }

  const renderPosterLoadingView = () => (
    <div className="home-loader-container" testid="loader">
      <TailSpin color="#D81F26" height={50} width={50} />
    </div>
  )

  const renderPosterFailureView = () => (
    <div className="poster-failure-view">
      <img
        src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1670040709/Movies%20App/alert-triangle_sc1zom.png"
        alt="failure view"
        className="poster-failure-image"
      />
      <p className="failure-title">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failure-retry-button"
        onClick={getOriginalsData}
      >
        Try Again
      </button>
    </div>
  )

  const renderPosterOutputView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderPosterSuccessView()
      case apiStatusConstants.inProgress:
        return renderPosterLoadingView()
      case apiStatusConstants.failure:
        return renderPosterFailureView()

      default:
        return null
    }
  }

  const renderOriginalsLoadingView = () => (
    <div className="loader-container" testid="loader">
      <TailSpin color="#D81F26" height={50} width={50} />
    </div>
  )

  const renderOriginalsSuccessView = () => (
    <VideosSlider videoData={originalsData} />
  )

  const renderOriginalsFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1670040709/Movies%20App/alert-triangle_sc1zom.png"
        alt="failure view"
        className="poster-failure-image"
      />
      <p className="failure-title">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failure-retry-button"
        onClick={getOriginalsData}
      >
        Try Again
      </button>
    </div>
  )

  const renderOriginalsOutputView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderOriginalsSuccessView()
      case apiStatusConstants.inProgress:
        return renderOriginalsLoadingView()
      case apiStatusConstants.failure:
        return renderOriginalsFailureView()

      default:
        return null
    }
  }

  return (
    <>
      <div className="home-bg-container">
        {renderPosterOutputView()}
        <hr className="breakline" />
        <h1 className="section-title">Trending Now</h1>
        <div className="video-slider-container">
          <TrendingSection />
        </div>
        <h1 className="section-title">Top Rated</h1>
        <div className="video-slider-container">
          <TopRatedSection />
        </div>
        <h1 className="section-title">Originals</h1>
        <div className="video-slider-container">
          {renderOriginalsOutputView()}
        </div>
      </div>
      <FooterSection />
    </>
  )
}

export default HomeSection
