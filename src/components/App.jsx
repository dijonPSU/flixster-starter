import MovieList from './MovieList'
import Header from './Header'
import './App.css'
import { useState } from "react";




const App = () => {
  const [Data, setData] = useState([]);
  const [sData, setsData] = useState([]);

  return (
    <div className="App">
      <Header setsData={setsData} current={Data}/>
      <MovieList search={sData} data={Data} setData={setData} />
    </div>
  )
}



export default App
