import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, ThemeProvider } from "@mui/material";
import { Whatshot, Search, Movie, Tv } from "@mui/icons-material";
import { ThemeContext } from "../ContextProvider/ThemeContextProvider"

let bottomNavStyle = { backgroundColor: "#39445a", position: "fixed", width: "100%", bottom: 0, zIndex: "100" }

let actionStyle = { color: "white" }


export default function BottomNav() {

    const navigate = useNavigate()

    const { darkTheme } = useContext(ThemeContext)

    const [value, setValue] = React.useState(0)

    useEffect(() => {
        window.scroll(0, 0)
        if (value === 0) {
            navigate("/MediaCenter");
        } else if (value === 1) {
            navigate("MediaCenter/movies");
        } else if (value === 2) {
            navigate("MediaCenter/series");
        } else if (value === 3) {
            navigate("MediaCenter/search");
        }
    }, [value, navigate]);

    return (
        <ThemeProvider theme={darkTheme}>

            <BottomNavigation
                sx={bottomNavStyle}
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction
                    sx={actionStyle}
                    label="Trending"
                    icon={<Whatshot />}
                />
                <BottomNavigationAction
                    sx={actionStyle}
                    label="Movies"
                    icon={<Movie />}
                />
                <BottomNavigationAction
                    sx={actionStyle}
                    label="TV"
                    icon={<Tv />}
                />
                <BottomNavigationAction
                    sx={actionStyle}
                    label="Search"
                    icon={<Search />}
                />
            </BottomNavigation>
        </ThemeProvider>
    );
}