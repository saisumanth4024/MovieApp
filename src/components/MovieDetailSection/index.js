import {Component, useState,useEffect} from 'react'
import {useParams,Navigate} from 'react-router-dom'
import {BsPlayFill, BsPlusCircle} from 'react-icons/bs'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {TailSpin} from 'react-loader-spinner'
import format from 'date-fns/format'
import Header from '../Header'
import MovieItem from '../MovieItem/index'
import FooterSection from '../FooterSection/index'
import VideoPlayers from "../VideoPlayer/index"
// import ListItem from '../ListItem'
import ListContext from '../../context/ListContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}


const MovieDetailSection=(props)=>{
  console.log(props)
 

  const[movieDetailData,setMovieDetailData]=useState([])
  const[similarMovieDetailData,setSimilarMovieDetailData]=useState([])
  const[genresDetailData,setGenresDetailData]=useState([])
  const[spokenLanguageDetailData,setSpokenLanguageDetailData]=useState([])
  const[apiStatus,setApiStatus]=useState([])
  const {id} = useParams()

  useEffect(()=>{
    getMovieDetailData()
  },[])


  

 const getMovieData = data => ({
    id: data.id,
    backdropPath: data.backdrop_path,
    overview: data.overview,
    posterPath: data.poster_path,
    title: data.title,
    adult: data.adult,
    budget: data.budget,
    releaseDate: data.release_date,
    runtime: data.runtime,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
  })

  const getSimilarMoviesData = data => ({
    id: data.id,
    backdropPath: data.backdrop_path,
    posterPath: data.poster_path,
    title: data.title,
  })

 const getGenresData = data => ({
    id: data.id,
    name: data.name,
  })

  const getSpokenLanguageData = data => ({
    id: data.id,
    englishName: data.english_name,
  })

 const getMovieDetailData = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const movieDetailApiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(movieDetailApiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetch)
      const updatedMovieData = getMovieData(fetchedData.movie_details)
      const genresData = fetchedData.movie_details.genres.map(eachData =>
        getGenresData(eachData),
      )
      const similarMovieData = fetchedData.movie_details.similar_movies.map(
        eachData => getSimilarMoviesData(eachData),
      )
      const spokenLanguageData = fetchedData.movie_details.spoken_languages.map(
        eachData => getSpokenLanguageData(eachData),
      )
     
        setMovieDetailData(updatedMovieData)
        setSimilarMovieDetailData(similarMovieData)
        setGenresDetailData(genresData)
        setSpokenLanguageDetailData(spokenLanguageData)
        setApiStatus(apiStatusConstants.success)
     
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const runtime = () => {
    
    const hours = Math.floor(movieDetailData.runtime / 60)
    const minutes = Math.floor(movieDetailData.runtime) % 60

    return `${hours}h ${minutes}m`
  }

  const releasedYear = () => {
    
    const {releaseDate} = movieDetailData
    if (releaseDate !== undefined) {
      return format(new Date(releaseDate), 'yyyy')
    }
    return null
  }

  const formattedDate = () => {
  
    const {releaseDate} = movieDetailData
    if (releaseDate !== undefined) {
      console.log(format(new Date(releaseDate), 'do MMMM yyyy'))
      return format(new Date(releaseDate), 'do MMMM yyyy')
    }
    return null
  }

  const onClickList = () => {}

 const renderSuccessView = () => (
    <ListContext.Consumer>
      {value => {
        const {addList, myList} = value
        const onClickList = () => {
          const List = {
            id,
            posterPath: movieDetailData.backdropPath,
            title: movieDetailData.title,
          }
          console.log(myList)
          const filteredId = myList.filter(item => {
            if (item.id === id) {
              return null
            }
            return item
          })
          const selectedList = [...filteredId, List]
          addList(selectedList)
        }
        const playVideo=()=>{
        console.log("Sai");
        return(
        <VideoPlayers/>)
        }

        const censorRating = movieDetailData.adult ? 'A' : 'U/A'

        return (
          <div className="movie-detail-bg-container">
            <div
              style={{backgroundImage: `url(${movieDetailData.backdropPath})`}}
              className="bg-image"
            >
              <Header />
              <div className="movie-heading-container">
                <h1 className="poster-title">{movieDetailData.title}</h1>
                <div className="time-year-container">
                  <p className="year-time">{runtime()}</p>
                  <p className="censor-criteria">{censorRating}</p>
                  <p className="year-time">{releasedYear()}</p>
                </div>
                <p className="poster-description">{movieDetailData.overview}</p>
                <div className="play-list-container">
                  <button type="button" className="play-button" onClick={playVideo}>
                    <BsPlayFill size={26} />
                    <span>Play</span>
                  </button>
                  <button
                    type="button"
                    className="list-button"
                    onClick={onClickList}
                  >
                    <BsPlusCircle size={26} />
                  </button>
                </div>
              </div>
            </div>
            <hr className="hr-line" />
            <div className="movie-detail-flex-container">
              <div className="movie-content-details">
                <h1 className="movie-content-title">Genres</h1>

                {genresDetailData.map(eachData => (
                  <p className="movie-content-description" key={eachData.id}>
                    {eachData.name}
                  </p>
                ))}
              </div>
              <div className="movie-content-details">
                <h1 className="movie-content-title">Audio Available</h1>

                {spokenLanguageDetailData.map(eachData => (
                  <p className="movie-content-description" key={eachData.id}>
                    {eachData.englishName}
                  </p>
                ))}
              </div>

              <div className="movie-content-details">
                <h1 className="movie-content-title">Rating Count</h1>
                <p className="movie-content-description">
                  {movieDetailData.voteCount}
                </p>
                <h1 className="movie-content-title">Rating Average</h1>
                <p className="movie-content-description">
                  {movieDetailData.voteAverage}
                </p>
              </div>
              <div className="movie-content-details">
                <h1 className="movie-content-title">Budget</h1>
                <p className="movie-content-description">
                  {movieDetailData.budget}
                </p>
                <h1 className="movie-content-title">Release Date</h1>
                <p className="movie-content-description">
                  {formattedDate()}
                </p>
              </div>
            </div>
            <h1 className="more-movies-title">More like this</h1>
            <ul className="more-movies-container">
              {similarMovieDetailData.map(eachData => (
                <MovieItem movieData={eachData} key={eachData.id} />
              ))}
            </ul>

            <FooterSection />
          </div>
        )
      }}
    </ListContext.Consumer>
  )

 const renderLoadingView = () => (
    <div className="movie-detail-loader-container" testid="loader">
      <TailSpin color="#D81F26" height={50} width={50} />
    </div>
  )

 const renderFailureView = () => (
    <div className="no-result-view-container">
      <img
        src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1670002135/Movies%20App/Failure_l6kgfg.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        type="button"
        className="retry-button"
        onClick={getMovieDetailData}
      >
        Try Again
      </button>
    </div>
  )

 const renderMovieDetailOutputView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.failure:
        return renderFailureView()

      default:
        return null
    }
  }

  return <>{renderMovieDetailOutputView()}</>
}






export default MovieDetailSection
