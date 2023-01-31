import React, {useState} from 'react';
import Catalog from "../../features/catalog/Catalog";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Header from "./Header";

function App() {

    const [darkMode, setDarkMode] = useState(false);

    const lightOrDarkMode = darkMode ? "dark" : "light";

    const theme = createTheme({
        palette: {
            mode: lightOrDarkMode,
            background: {
                default: darkMode? "#121212" : "#eaeaea"
            }
        }
    })

    function changeThemeMode() {
        setDarkMode(prevState => !prevState)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header  changeThemeMode={changeThemeMode} />
            <Container>
                <Catalog />
            </Container>
        </ThemeProvider>
      );
}

export default App;
