import {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import AccountMenu from './menuDropDown'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'

import './index.css'

const Header = props => {
  const [showMenu, setShowMenu] = useState(false)
  const [currentPath, setCurrentPath] = useState('')
  const pathLocation=useLocation()

  useEffect(() => {
    const paths =pathLocation.pathname
   
    setCurrentPath(paths)
  })


  const showSearchInput = () => currentPath === '/search'

  const onShowSearchInput = () => {
    const {getSearchApiData} = props
    const showInput = showSearchInput()
    
  }

  const toggleMenuItems = () => {
    setShowMenu(prevShowMenu => !prevShowMenu)
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const onKeyDownEnter = event => {
    const {getSearchApiData} = props
    if (event.key === 'Enter') {
      getSearchApiData()
    }
  }

  console.log(currentPath)
  const showInput = showSearchInput()
  const homeClassName = currentPath === '/' ? 'selected' : null
  const popularClassName = currentPath === '/popular' ? 'selected' : null
  const accountClassName = currentPath === '/account' ? 'selected' : null
  const searchClassName = currentPath === '/search' ? 'search-style' : null
  return (
    <nav>
      <div className="navbar">
        <div className="navbar-logo-link-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1669787785/Movies%20App/Movies_Logo_nu3gsl.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>

          <ul className="header-link-container">
            <Link to="/" className="route-link">
              <li className={`header-link ${homeClassName}`}>Home</li>
            </Link>
            <Link to="/popular" className="route-link">
              <li className={`header-link ${popularClassName}`}>Popular</li>
            </Link>
            <Link to="/mylist" className="route-link">
              <li className={`header-link ${popularClassName}`}>My List</li>
            </Link>
            <Link to="/popular" className="route-link">
              <li className={`header-link ${popularClassName}`}>
                <select className="select-options" name="Genre">
                  <option className="genre-option">Genre</option>
                  <option className="genre-option">Action</option>
                  <option className="genre-option">Sci-Fi</option>
                  <option className="genre-option">Adventure</option>
                  <option className="genre-option">Drama</option>
                  <option className="genre-option">Thriller</option>
                </select>
              </li>
            </Link>
          </ul>
        </div>
        <div className="search-and-avatar">
          <div className="search-container">  
          {showInput && (
              <input
                type="search"
                className="search-input"
                onChange={onChangeSearchInput}
                onKeyDown={onKeyDownEnter}
              />
            )}
            <Link to="/search">
              <button
                type="button"
                className="search-button"
                onClick={onShowSearchInput}
                testid="searchButton"
              >
                <HiOutlineSearch size={18} color="red" />
              </button>
            </Link>
            <AccountMenu/>
          </div>
          
        {/*  <button
            type="button"
            className="menu-buttons"
            onClick={toggleMenuItems}
          >
            <MdOutlineKeyboardArrowDown className="arrow-down" />
          </button>*/}
        </div>
      </div>
      {/* showMenu ? (
        <ul className="menu-link-container">
          <Link to="/" className="route-link home">
            <li className={`menu-link  ${homeClassName} home`}>Home</li>
          </Link>
          <Link to="/popular" className="route-link">
            <li className={`menu-link ${popularClassName} popular`}>Popular</li>
          </Link>
          <Link to="/mylist" className="route-link">
            <li className={`menu-link ${accountClassName} mylist`}>MyList</li>
          </Link>
          <Link to="/account" className="route-link">
            <li className={`menu-link ${accountClassName}`}>Account</li>
          </Link>
          <li>
            <button type="button" className="logout-button" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      ) : (
        ' '
      )*/}
    </nav>
  )
}

export default (Header)
