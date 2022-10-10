import { createTheme, Pagination, ThemeProvider } from "@mui/material"

export default function SitePagination(props) {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });


    const { setPage, numPages = 10 } = props
    function handlePageChange(page) {
        console.log(page)
        setPage(page)
        window.scroll(0, 0)
    }

    return <div style={{ marginTop: "10px", justifyContent: "center", display: "flex", wdith: "100%" }}>
        <ThemeProvider theme={darkTheme}>
            <Pagination
                count={numPages}
                size="large"
                onChange={(event) => { handlePageChange(event.target.textContent) }}
                shape="rounded" 
                color="primary"
            />
        </ThemeProvider>
    </div>
}