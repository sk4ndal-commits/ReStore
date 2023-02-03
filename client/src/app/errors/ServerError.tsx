import {Button, Container, Divider, Paper, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import agent from "../api/agent";
import {useNavigate} from "react-router-dom";

interface ErrorDetails {
    title: string,
    detail: string
}

export default function ServerError() {

    const [errorResponseDetail, setErrorResponseDetail] = useState<ErrorDetails>();

    const navigateUrl = useNavigate();

    useEffect(() => {
        agent.TestErrors.get500Error().catch(err =>
            setErrorResponseDetail({title: err.data.title, detail: err.data.detail}))
    },[])



    function gotoCatalog() {
        navigateUrl("/catalog")
    }

    return(
        <Container component={Paper}>
            {errorResponseDetail
                ?   (
                        <>
                            <Typography color={"error"} variant={"h5"} gutterBottom>
                                {errorResponseDetail.title}
                            </Typography>
                            <Divider />
                            <Typography>{errorResponseDetail.detail}</Typography>
                        </>
                    )
                :   (
                        <>
                            <Typography>Error</Typography>
                        </>
                    )
            }
            <Button onClick={gotoCatalog}>go to store</Button>
        </Container>
    )
}