import moviedbClient from "../API/moviedb"
import { useEffect } from "react"
import { Chip } from "@mui/material"


export default function Genres(props) {
    const { selectedGenres, setSelectedGenres, genres, setGenres, type } = props

    function handleAdd(genre) {
        setSelectedGenres(oldGenres => {
            return [...oldGenres, genre]
        })
        setGenres(oldGenres => {
            return oldGenres.filter(e => e.id !== genre.id)
        })
    }

    function handleRemove(genre) {
        setGenres(oldGenres => {
            // Lexicographically sorts the array upon change for neater display
            let genreList = [...oldGenres, genre].sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
            return genreList
        })
        setSelectedGenres(oldGenres => {
            return oldGenres.filter(e => e.id !== genre.id)
        })
    }

    useEffect(() => {
        let isMounted = true
        async function fetchGenres() {
            try {
                const { data } = await moviedbClient.get(`/genre/${type}/list`)
                // Only set data if component is actually in use
                if (isMounted) {
                    setGenres(data.genres)
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchGenres()
        // Remove mount if component is closed
        return () => (isMounted = false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return <div style={{ display: "flex", justifyContent: "center", flexDirection: "column"}}>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
            {genres && genres.map(item => <Chip
                label={item.name}
                sx={{ bgcolor: "#505050", color: "white", fontWeight: "bolder" }}
                clickable
                key={item.id}
                onClick={() => { handleAdd(item) }}
            />)}
        </div>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
            {selectedGenres &&

                selectedGenres.map(item => <Chip
                    label={item.name}
                    sx={{ fontWeight: "bolder", fontSize: "20px" }}
                    clickable
                    color="primary"
                    key={item.id}
                    onDelete={() => { handleRemove(item) }}
                />)}
        </div>
    </div>
}