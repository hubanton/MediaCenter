import moviedbClient from "../API/moviedb"
import ContentCard from "../Components/ContentCard/ContentCard"
import { useEffect, useState } from "react"
import Genres from "../Components/Genres"

import "./CardStyling.css"
import SitePagination from "../Components/SitePagination"
import useGenres from "../Hooks/useGenres"
import EmptyMsg from "../Components/EmptyMsg"

export default function Trending() {
    const [content, setContent] = useState([])

    const [page, setPage] = useState(1)
    const [numPages, setNumPages] = useState(10)
    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])

    const genreIdList = useGenres(selectedGenres)

    useEffect(() => {
        let isMounted = true
        async function fetchMovies() {
            try {
                const { data } = await moviedbClient.get("/discover/movie", {
                    params: {
                        page: page,
                        language: "en-US",
                        include_video: "false",
                        include_adult: "false",
                        with_genres: genreIdList
                    }, 
                
                })
                // Only set data if component is actually in use
                if (isMounted) {
                    setContent(data.results.slice(0, 100))
                    setNumPages(data.total_pages > 100 ? 100 : data.total_pages)
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchMovies()
        // Remove mount if component is closed
        return () => (isMounted = false)
    }, [page, genreIdList])

    return <div>
        <Genres
            setGenres={setGenres}
            genres={genres}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            type="movie"
        
        />
        <div className="cardGrid">
            {content && content.map((item) => {
                return <ContentCard
                    key={item.id}
                    id={item.id}
                    title={item.title || item.name}
                    type="movie"
                    release_date={item.release_date || item.first_air_date}
                    poster_path={item.poster_path}
                    rating={item.vote_average}

                />
            })}
        </div>
        {content.length > 0 ? <SitePagination setPage={setPage} numPages={numPages}/> : <EmptyMsg/>}
    </div>
}