import { Button, createTheme, TextField, ThemeProvider, Tabs, Tab } from "@mui/material"
import { useState, useEffect } from "react"
import { Search } from "@mui/icons-material"
import moviedbClient from "../API/moviedb";
import EmptyMsg from "../Components/EmptyMsg";
import ContentCard from "../Components/ContentCard/ContentCard";
import SitePagination from "../Components/SitePagination";
export default function SearchSite() {

    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numPages, setNumPages] = useState();

    function setSearch(input) {
        setSearchText(input)
    }

    async function fetchSearch() {
        try {
            let response = []
            if(searchText !== "") {
                response = await moviedbClient.get(`/search/${type ? "tv" : "movie"}`,
                {
                    params: {
                        page: page,
                        language: "en-US",
                        include_video: "false",
                        include_adult: "false",
                        query: searchText
                    }

                })
            } else {
                response = await moviedbClient.get(`/trending/${type ? "tv" : "movie"}/day`, {params: {page: page}})
            }
            const {data} = response
            setContent(data.results.length > 100 ? data.results.slice(0, 100) : data.results)
            setNumPages(data.total_pages > 100 ? 100 : data.total_pages)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
    }, [type, page]);

    const darkTheme = createTheme({
        palette: {
            mode: "dark"
        }
    })

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
      }, [type, page]);

    return <div>
        <ThemeProvider theme={darkTheme}>
            <div style={{ display: "flex", margin: "15px 0" }}>
                <TextField
                    sx={{ flex: "1"}}
                    className="searchBox"
                    label="Search"
                    variant="filled"
                    onChange={e => { setSearch(e.target.value) }}
                />
                <Button
                    sx={{ marginLeft: "10px" }}
                    onClick={fetchSearch}
                    variant="contained"
                >
                    <Search fontSize="large" />
                </Button>
            </div>
            <Tabs
                sx={{marginBottom: "30px"}}
                variant="fullWidth"
                centered
                value={type}
                textColor="primary"
            >
                <Tab sx={{ width: "50%" }} label="Search Movies" onClick={() => {setType(0)}} />
                <Tab sx={{ width: "50%" }} label="Search Shows" onClick={() => {setType(1)}}/>
            </Tabs>
        </ThemeProvider>
        <div className="cardGrid">
            {content && content.map((item) => {
                return <ContentCard
                    key={item.id}
                    id={item.id}
                    title={item.title || item.name}
                    type={type === 0 ? "movie" : "tv"}
                    release_date={item.release_date || item.first_air_date}
                    poster_path={item.poster_path}
                    rating={item.vote_average}

                />
            })}
        </div>
        {content.length > 0 ? <SitePagination setPage={setPage} numPages={numPages} /> : <EmptyMsg />}
    </div>
}