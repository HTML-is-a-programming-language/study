import React, {useEffect, useState} from 'react'
import { useParams } from '../../../node_modules/react-router-dom/dist/index'
import axios from '../../api/axios';

export default function DetailPage() {
  const {movieId} = useParams();
  const [movie, setMovie] = useState({});
  console.log('movieId',movieId);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `/movie/${movieId}`
      )
      console.log('request', request);
      setMovie(request.data);
    }
    fetchData();
  }, [movieId]);

  if(!movie) return <div>...loading</div>;

  return (
    <section>
      <img className='modal__poster-img' src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="poster" />
    </section>
  )
}
