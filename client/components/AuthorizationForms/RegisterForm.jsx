import { useState } from "react";

import { motion } from "framer-motion";

import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import LoginIcon from '@mui/icons-material/Login';
import { useMediaQuery, useTheme } from '@mui/material';

import { Link, useNavigate } from "react-router-dom";

import { useRegisterMutation } from "../../redux/api";

import LoadingMessage from "../ErrorMessages/LoadingMessage"

const RegisterForm = () => {
    const [register, { data, error, isLoading }] = useRegisterMutation();
    if (isLoading){
        return <><LoadingMessage/></>
    }
    if (error) {
        return <div>Whoops! Something went wrong registering you.</div>
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const [email, setEmail] = useState("");

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await register({ username, email, password, secondPassword }),
                console.log("Success!")
            navigate("/account")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Grid container>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}>
                    <Card sx={{ p: 5, backgroundColor: "white", maxWidth: 600 }}>
                        <Typography variant="h4" sx={{ textAlign: "center", color: "#205375", p: 1 }}>
                            Sign Up:
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Stack direction="column">
                                <TextField
                                    label="Enter Username"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    size="small"
                                    variant="filled"
                                    sx={{ m: 1 }}
                                />
                                <TextField
                                    label="Enter E-mail"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    size="small"
                                    variant="filled"
                                    sx={{ m: 1 }}
                                />
                                <TextField
                                    label="Enter Password"
                                    value={password}
                                    type="password"
                                    onChange={(event) => setPassword(event.target.value)}
                                    size="small"
                                    variant="filled"
                                    sx={{ m: 1 }}
                                    helperText={
                                        password && password.length < 8
                                            ? <Alert severity="error"> Your password needs to be at least 8 characters long </Alert>
                                            : null
                                    }
                                />
                                <TextField
                                    label="Re-enter Password"
                                    value={secondPassword}
                                    type="password"
                                    onChange={(event) => setSecondPassword(event.target.value)}
                                    size="small"
                                    variant="filled"
                                    error={
                                        !!(password && secondPassword !== secondPassword)
                                    }
                                    helperText={
                                        password && secondPassword && password !== secondPassword ?
                                            <Alert severity="error"> Passwords do not match </Alert> : null
                                    }
                                />
                                {isMobile ?
                                    <div>
                                        <Button
                                            type="submit"
                                            sx={{ backgroundColor: "#088395", color: "white", width: "100%", p: 1, my: 1, }}>
                                            Start Your Cooking Journey
                                        </Button>
                                        <Typography sx={{ mt: 2, textAlign: "center", color: "#205375" }}>
                                            Already have an account?
                                        </Typography>
                                        <Link to="/login">
                                            <Button
                                                variant="outlined"
                                                sx={{ color: "#205375", backgroundColor: "transparent", my: 1, width: "100%" }}>
                                                Login to your account
                                                <LoginIcon sx={{ ml: 2, color: "#205375" }} />
                                            </Button>
                                        </Link>
                                    </div>
                                    ://is NOT mobile... 
                                    <div>
                                        <Button
                                            type="submit"
                                            sx={{ backgroundColor: "#088395", color: "white", p: 1, my: 1, mx: 20 }}>
                                            Start Your Cooking Journey
                                        </Button>
                                        <Typography sx={{ mt: 2, textAlign: "center", color: "#205375" }}>
                                            Already have an account?
                                        </Typography>
                                        <Link to="/login">
                                            <Button sx={{ color: "#205375", backgroundColor: "transparent", my: 1 }}>
                                                Login to your account
                                                <LoginIcon sx={{ ml: 2, color: "#205375" }} />
                                            </Button>
                                        </Link>
                                    </div>}
                            </Stack>
                        </form>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                </Grid>
            </Grid>
        </>
    )
}
export default RegisterForm