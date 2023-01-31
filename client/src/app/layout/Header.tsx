import {AppBar, Switch, Toolbar, Typography} from "@mui/material";

interface Props {
    changeThemeMode: () => void,
}

export default function Header({changeThemeMode}: Props) {
    return(
        <AppBar position={"static"} sx={{mb: 4}}>
            <Toolbar>
                <Typography variant={"h6"}>
                    RE-STORE
                </Typography>
                <Switch onChange={changeThemeMode}></Switch>
            </Toolbar>
        </AppBar>
    )
}