import moviedbClient from "../API/moviedb"
import ContentCard from "../Components/ContentCard/ContentCard"
import { useContext, useEffect, useState } from "react"
import EmptyMsg from "../Components/EmptyMsg"
import "./CardStyling.css"
import SitePagination from "../Components/SitePagination"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material"
import { ThemeContext } from "../ContextProvider/ThemeContextProvider"



export default function Trending() {
    const [content, setContent] = useState([])
    const [timeframe, setTimeframe] = useState("day")
    const [page, setPage] = useState(1)
    const [numPages, setNumPages] = useState(10)

    const {darkTheme} = useContext(ThemeContext)


    const toggleStyle = {
        fontSize: "1.5vw",
        width: "5vw",
        fontWeight: "900",
        textTransform: "none",
        color: "white",
        borderRadius: "12px"
    }

    useEffect(() => {
        let isMounted = true
        async function fetchTrending() {
            try {
                const { data } = await moviedbClient.get(`/trending/all/${timeframe}`, { params: { page: page } })

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
    }, [page, timeframe])

    return <div>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>

            <ThemeProvider theme={darkTheme}>
                <ToggleButtonGroup
                    color="secondary"
                    value={timeframe}
                    exclusive
                    onChange={(event) => { setTimeframe(event.target.value) }}
                    aria-label="Timeframe"
                >
                    <ToggleButton sx={toggleStyle} value="day">24h</ToggleButton>
                    <ToggleButton sx={toggleStyle} value="week">7D</ToggleButton>
                </ToggleButtonGroup>
            </ThemeProvider>

        </div>
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
        {content.length > 0 ? <SitePagination setPage={setPage} numPages={numPages} /> : <EmptyMsg />}
    </div>
}