import React, {useState} from 'react';
import Catalog from "../../features/catalog/Catalog";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Header from "./Header";
import {Route, Routes} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../errors/ServerError";

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
            <ToastContainer position={"bottom-right"} hideProgressBar={false} />
            <CssBaseline />
            <Header  changeThemeMode={changeThemeMode} />
            <Container>
                <Routes>
                    <Route path={"/"} element={<HomePage />} />
                    <Route path={"/catalog"} element={<Catalog />} />
                    <Route path={"/catalog/:id"} element={<ProductDetails />} />
                    <Route path={"/about"} element={<AboutPage />} />
                    <Route path={"/contact"} element={<ContactPage />} />
                    <Route path={"/server-error"} element={<ServerError />} />
                </Routes>
            </Container>
        </ThemeProvider>
      );
}

export default App;
