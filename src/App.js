import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./Components/Header/Header.js"
import BottomNav from "./Components/BottomNav.js";
import Trending from "./Pages/Trending.js";
import Movies from "./Pages/Movies.js";
import Tv from "./Pages/Tv.js";
import About from "./Pages/About.js";
import SearchSite from "./Pages/Search.js";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Trending/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/series" element={<Tv/>}/>
          <Route path="/search" element={<SearchSite/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </div>
      <BottomNav/>
    </BrowserRouter>
  );
}

export default App;
