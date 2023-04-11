// query movies 和 query SingleMovie 出现了重复。
// 采用一个 custom useFetch 来解决！
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT } from './context'
import useFetch from './useFetch'

const SingleMovie = () => {

  const {id} = useParams();

  const {loading, error, data: movie} = useFetch(`&i=${id}`); // 一开始无法加载 data 是因为 当 $i={id} 时，回传的不是 data.Search

  // 以下基本是 invisible 的因为加载太快
  if (loading) {
    return <div className='loading'></div>
  }

  if (error.show) {
    return (<div className='page-error'>
      <h1>{error.msg}</h1>
      <Link to="/" className='btn'>back to movies</Link>
    </div>)
  }

  const {Poster:poster, Title:title, Year:year, Plot:plot} = movie;

  return <section className='single-movie'>
    <img src={poster === 'N/A' ? 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png' : poster} alt={title}></img>
    <div className='single-movie-info'>
      <h2>{title}</h2>
      <p>{plot}</p>
      <h4>{year}</h4>
      <Link className='btn' to='/'>back to movies</Link>
    </div>
  </section>
}

export default SingleMovie
