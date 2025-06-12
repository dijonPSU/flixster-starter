import MovieList from './MovieList'
import Header from './Header'
import Footer from './Footer';
import './App.css'
import { useState } from "react";



const App = () => {
  const [Data, setData] = useState([]);
  const [sData, setsData] = useState([]);

  return (
    <div className="App">
      <Header setsData={setsData} current={Data}/>
      <div className="content">
        <MovieList search={sData} data={Data} setData={setData} />
      </div>
      <Footer />
    </div>
  )
}



export default App
