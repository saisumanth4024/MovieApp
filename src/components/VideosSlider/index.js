import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const VideosSlider = props => {
  const settings = {
    className: 'slider variable-width',
    dots: false,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  }
  const {videoData} = props

  return (
    <>
      <Slider {...settings}>
        {videoData.map(eachVideo => (
          <Link to={`/movies/${eachVideo.id}`} key={eachVideo.id}>
            <img
              className="thumbnail"
              src={eachVideo.posterPath}
              alt={eachVideo.title}
            />
          </Link>
        ))}
      </Slider>
    </>
  )
}

export default VideosSlider
