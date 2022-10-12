import { createContext, useState } from "react";
import { createTheme } from "@mui/material";

export const ThemeContext = createContext()

export default function ThemeContextProvider(props) {

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });



    return <ThemeContext.Provider
        value={{darkTheme}}
    >
        {props.children}
    </ThemeContext.Provider>
}