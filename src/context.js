// query movies 和 query SingleMovie 出现了重复。
// 采用一个 custom useFetch 来解决！
import React, { useState, useContext, useEffect, useCallback } from 'react'
import useFetch from './useFetch' // 要 import

// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const [searchTerm, setSearchTerm] = useState('batman');
  const {loading, error, data: movies} = useFetch(`&s=${searchTerm}`)

  return <AppContext.Provider value={{
    loading, searchTerm, setSearchTerm, movies, error
  }}>{children}
  </AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
