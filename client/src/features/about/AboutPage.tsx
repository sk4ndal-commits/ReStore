import {
    Alert,
    AlertTitle,
    Button,
    ButtonGroup,
    Container,
    List,
    ListItem, ListItemText,
    Typography
} from "@mui/material";
import agent from "../../app/api/agent";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function AboutPage() {

    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function getValidationError() {
        agent.TestErrors.getValidationError()
            .then(() => console.log('should not see this'))
            .catch(err => setValidationErrors(err))
    }

    const navigateUrl = useNavigate();

    function gotoServerErrorComponent() {
        navigateUrl("/server-error")
    }

    return(
        <Container>
            <Typography gutterBottom variant={"h2"}>Testing Errors</Typography>

            <ButtonGroup fullWidth>

                <Button variant={"contained"}
                        onClick={() => agent.TestErrors.get400Error().catch(err => console.log(err))}
                >
                    400 Error
                </Button>

                <Button variant={"contained"}
                        onClick={() => agent.TestErrors.get401Error().catch(err => console.log(err))}
                >
                    401 Error
                </Button>

                <Button variant={"contained"}
                        onClick={() => agent.TestErrors.get404Error().catch(err => console.log(err))}
                >
                    404 Error
                </Button>

                <Button variant={"contained"}
                        onClick={gotoServerErrorComponent}
                >
                    500 Error
                </Button>

                <Button variant={"contained"}
                        onClick={getValidationError}
                >
                    Validation Error
                </Button>

            </ButtonGroup>

            {validationErrors.length > 0 &&
                <Alert severity={"error"}>
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map(err => (
                            <ListItem key={err}>
                                <ListItemText>{err}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            }

        </Container>
    )
}