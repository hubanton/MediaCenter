import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./Components/Header/Header.js"
import BottomNav from "./Components/BottomNav.js";
import Trending from "./Pages/Trending.js";
import Movies from "./Pages/Movies.js";
import Tv from "./Pages/Tv.js";
import SearchSite from "./Pages/Search.js";
import ThemeContextProvider from "./ContextProvider/ThemeContextProvider.js";

function App() {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <Header />
        <div className="App">
          <Routes>
            <Route path="/MediaCenter" element={<Trending />} />
            <Route path="/MediaCenter/movies" element={<Movies />} />
            <Route path="/MediaCenter/series" element={<Tv />} />
            <Route path="/MediaCenter/search" element={<SearchSite />} />
          </Routes>
        </div>
        <BottomNav />
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;
