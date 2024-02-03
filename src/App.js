import {useState,Fragment} from 'react'
import {BrowserRouter as Router,Switch,Routes,Navigate , Route, Redirect} from 'react-router-dom'
import LoginRoute from './components/LoginRoute/index'
import Header from './components/Header/index'
import HomeSection from './components/HomeSection/index'
import PopularSection from './components/PopularSection/index'
import AccountSection from './components/AccountSection/index'
import SearchRoute from './components/SearchRoute/index'
import MovieDetailSection from './components/MovieDetailSection/index'
import NotFound from './components/NotFound/index'
import ProtectedRoute from './components/ProtectedRoute/index'
import ListContext from './context/ListContext'
import MyList from './components/MyList/index'
import './App.css'
import VideoPlayer from './components/VideoPlayer'

const App = () => {
  const [myList, setMyList] = useState([])

  const addList = selectedList => {
    setMyList(selectedList)
  }

  return (
    <ListContext.Provider value={{myList, addList}}>
    <Router>
      <Routes>
        <Route path='/video' element={<VideoPlayer/>}/>
        <Route path="/login" element={<LoginRoute/>} />
        <Route element={<ProtectedRoute/>}>
           <Route path="/" element={<HomeSection/>}/>
           <Route path="/popular" element={<PopularSection/>} />
           <Route path="/account" element={<AccountSection/>} />
           <Route path="/search" element={<SearchRoute/>} />
           <Route path="/mylist" element={<MyList/>} />
           <Route path="/movies/:id" element={<MovieDetailSection/>}/>
        </Route> 
        <Route path="/not-found" element={<NotFound/>} />
        <Route path="*" element={<Navigate to="/not-found"/>} />
      </Routes>
      </Router>
    </ListContext.Provider>
  )
}

export default App
