// import Loader from 'react-loader-spinner'
import Header from '../Header'
import ListItem from '../ListItem'
import FooterSection from '../FooterSection'
import ListContext from '../../context/ListContext'
import './index.css'

const MyList = () => (
  <ListContext.Consumer>
    {value => {
      const {myList} = value
      console.log(myList)
      return (
        <div className="mylist-bg-container">
          <Header />
          <ul className="mylist-item-list-container">
            {myList.map(eachMovie => (
              <ListItem movieData={eachMovie} key={eachMovie.id} />
            ))}
          </ul>
          <FooterSection />
        </div>
      )
    }}
  </ListContext.Consumer>
)

export default MyList
