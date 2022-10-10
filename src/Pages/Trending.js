import moviedbClient from "../API/moviedb"
import ContentCard from "../Components/ContentCard/ContentCard"
import { useEffect, useState } from "react"
import EmptyMsg from "../Components/EmptyMsg"
import "./CardStyling.css"
import SitePagination from "../Components/SitePagination"

export default function Trending() {
    const [content, setContent] = useState([])

    const [page, setPage] = useState(1)
    const [numPages, setNumPages] = useState(10)

    useEffect(() => {
        let isMounted = true
        async function fetchTrending() {
            try {
                // Fetch responses for all stocks in the 
                // watchList simultaneously
                const { data } = await moviedbClient.get("/trending/all/day", {params: {page: page}})

                // Only set data if component is actually in use
                if (isMounted) {
                    setContent(data.results.length > 100 ? data.results.slice(0, 100) : data.results)
                    setNumPages(data.total_pages > 100 ? 100 : data.total_pages)
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchTrending()
        // Remove mount if component is closed
        return () => (isMounted = false)
    }, [page])

    return <div>
        <div className="cardGrid">
            {content && content.map((item) => {
                return <ContentCard
                    key={item.id}
                    id={item.id}
                    title={item.title || item.name}
                    type={item.media_type}
                    release_date={item.release_date || item.first_air_date}
                    poster_path={item.poster_path}
                    rating={item.vote_average}

                />
            })}
        </div>
        {content.length > 0 ? <SitePagination setPage={setPage} numPages={numPages}/> : <EmptyMsg/>}
    </div>
}