import React from 'react'
import { useGlobalContext } from './context'
const SearchForm = () => {

  const {searchTerm, setSearchTerm, error} = useGlobalContext();

  return <form className='search-form' onSubmit={(e) => {e.preventDefault()}}>
    <h2>search movies</h2>
    <input 
      type='text' 
      className='form-input' 
      value={searchTerm}
      onChange={(e) => {setSearchTerm(e.target.value)}}
    />
    {/* error 的 msg 来自 data object 回传的 Error 内容！ */}
    {error.show && <div className='error'>{error.msg}</div>}
  </form>
}
// controlled input 的两个关键：
  // onChange 中包含 searchItem 的 setter,
  // onSubmit 时 preventDefault.
export default SearchForm
