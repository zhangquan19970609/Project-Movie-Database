// query movies 和 query SingleMovie 出现了重复。
// 采用一个 custom useFetch 来解决！
import React, {useState, useEffect} from 'react';

const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`

const useFetch = (urlParams) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({show:false, msg:''})
    // const [movies, setMovies] = useState([]); 可能涉及 movies 和 singleMovie 两种情况，
    // 一种是 array 一种是 object
    const [data, setData] = useState(null);

    const fetchMovies = async (url) => {
        setLoading(true);
        try {
            const response = await fetch(url); 
            const data = await response.json();
            console.log(data);
            
            if (data.Response === 'True') {
                // console.log(data);
                setData(data.Search || data); // in case 单个的 singleMovie 中没有 Search Array
                setError({show:false,msg:''})
            } else {
                setError({show:true, msg:data.Error});
            }
            setLoading(false);
        } catch (error) {
            // console.log(error);
        }};

        useEffect(() => {
            // fetchMovies(`${API_ENDPOINT}&s=${searchTerm}`);
            fetchMovies(`${API_ENDPOINT}${urlParams}`);
        },[urlParams]); 
        // dependency 从 searchTerm 变为 URLParams，使其能在 id 和 search 两个功能下使用
        // 对整个 useFetch 也采用 urlParams 做 参数。
    return {loading, error, data}
}

export default useFetch;