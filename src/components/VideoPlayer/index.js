import ReactPlayer from "react-player"
import {useEffect,useState} from 'react'

const VideoPlayers = () => {
    const [dating,setDating]=useState([])
  useEffect(()=>{
    getData()
  },[])

   const getData=async()=>{
    const url = 'https://movies-api14.p.rapidapi.com/movie/27205';
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'faeddd3ef1msh4924fe3cd3cbec1p182836jsnf6d4af2634ed',
		'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	const data=result.movies.youtube_trailer;
    setDating(data)
} 
catch (error) {
	console.error(error);
}
}

  return (
    <ReactPlayer url={dating} />
  )
}

export default VideoPlayers