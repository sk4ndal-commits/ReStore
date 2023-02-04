import {Button, Container, Paper, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function ServerError() {


    const navigateUrl = useNavigate();

    function gotoCatalog() {
        navigateUrl("/catalog")
    }

    return(
        <Container component={Paper}>
            <Typography color={"error"} variant={"h5"} gutterBottom>
                Server Error
            </Typography>

            <Typography>We need to get the error object from the interceptor here</Typography>

            <Button onClick={gotoCatalog}>go to store</Button>
        </Container>
    )
}