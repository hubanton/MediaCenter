export default function useGenres(selectedGenres) {
    if(selectedGenres.length < 1) return ""

    const ids = selectedGenres.map(e => {return e.id})

    return ids.reduce((acc, curr) => acc + "," + curr)
}