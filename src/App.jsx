import MovieList from './MovieList'
import Header from './Header'
import './App.css'
import { useState, useEffect } from "react";




const App = () => {
  const [searchCheck, setSearchCheck] = useState(false);
  return (
    <div className="App">
      <Header />
      <MovieList search={searchCheck}/>
    </div>
  )
}

export default App
