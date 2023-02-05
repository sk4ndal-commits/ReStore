import {Container, Paper, Typography} from "@mui/material";
import RedirectButton from "../redirect/RedirectButton";


export default function ServerError() {

    // TODO: pass error object from interceptor to here

    return(
        <Container component={Paper}>
            <Typography color={"error"} variant={"h5"} gutterBottom>
                Server Error
            </Typography>

            <Typography>We need to get the error object from the interceptor here</Typography>

            <RedirectButton url={"/catalog"} buttonName={"go to store"} />
        </Container>
    )
}