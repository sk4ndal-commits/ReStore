import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

interface Props {
    url: string,
    buttonName: string
}


export default function RedirectButton({url, buttonName}: Props) {

    const navigateUrl = useNavigate();

    function gotoUrl() {
        navigateUrl(url)
    }

    return(
        <Button onClick={gotoUrl}>{buttonName}</Button>
    )
}
