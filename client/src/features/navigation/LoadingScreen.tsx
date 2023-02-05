import {Backdrop, CircularProgress, Typography} from "@mui/material";

export default function LoadingScreen() {
    return(
        <Backdrop open={true} invisible={true}>
            <CircularProgress />
            <Typography variant={"h4"}>Loading</Typography>
        </Backdrop>
    )
}
