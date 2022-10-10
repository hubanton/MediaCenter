import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Whatshot, Search, Movie, Tv } from "@mui/icons-material";

let bottomNavStyle = { backgroundColor: "#39445a", position: "fixed", width: "100%", bottom: 0, zIndex: "100"}

let actionStyle = { color: "white" }


export default function BottomNav() {

    const navigate = useNavigate()

    const [value, setValue] = React.useState(0)

    useEffect(() => {
        window.scroll(0, 0)
        if (value === 0) {
            navigate("/");
        } else if (value === 1) {
            navigate("/movies");
        } else if (value === 2) {
            navigate("/series");
        } else if (value === 3) {
            navigate("/search");
        }
    }, [value, navigate]);

    return (
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
                label="Movie"
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
    );
}