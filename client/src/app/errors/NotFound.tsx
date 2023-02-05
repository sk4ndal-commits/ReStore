import {Container, Typography} from "@mui/material";
import RedirectButton from "../redirect/RedirectButton";

export default function NotFound() {

    return(
        <Container>
            <Typography variant={"h3"} color={"error"}>Not Found</Typography>
            <RedirectButton url={"/catalog"} buttonName={"go to store"} />
        </Container>
    )
}
