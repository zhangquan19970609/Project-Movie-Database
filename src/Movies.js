// query movies 和 query SingleMovie 出现了重复。
// 采用一个 custom useFetch 来解决！
import React from 'react'
import { useGlobalContext } from './context'
import { Link } from 'react-router-dom'
import { toBeInTheDOM } from '@testing-library/jest-dom'
const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'

const Movies = () => {
  const {movies, loading} = useGlobalContext();
  if (loading === true) {
    // 根据参考答案做出的改动
    return <div className='loading'></div>
  }
  return <section className='movies'>
    {movies.map((item, index) => {
      const {imdbID: id, Title: title, Year: year, Poster: image} = item;
      // console.log(item); 
      // 经过 console.log 发现，如无 image，image 会显示为："N/A"
      return <Link 
        key={index} 
        className='movie' 
        to={`/movies/${id}`}
      >
        <article>
          <img src={image === "N/A" ? url : image} alt={title}></img>
          <div className='movie-info'>
            <h4 className="title">{title}</h4>
            <p>{year}</p>
          </div>
        </article>
      </Link>
    })}
  </section>
}

export default Movies
