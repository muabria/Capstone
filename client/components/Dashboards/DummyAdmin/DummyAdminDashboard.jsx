import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useMediaQuery, useTheme } from '@mui/material';

import { easeIn, motion } from "framer-motion";

import { Link } from "react-router-dom";

import { useGetAllUsersQuery } from "../../../redux/api"

import DummyMapAllUsers from "./DummyMapAllUsers";
import DummyMapPostsAdmin from "./DummyMapPostsAdmin";
import DummyAdminMapEquipment from "./DummyAdminMapEquipment";
import LoadingMessage from "../../ErrorMessages/LoadingMessage";

const DummyAdminDashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { data, error, isLoading } = useGetAllUsersQuery();

    if (!data) {
        return <div> </div>
    }
    if (isLoading) {
        return <div><LoadingMessage /></div>
    }
    if (error) {
        return <div> Oops! Something went wrong loading the data. </div>;
    } else

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeIn" }}>
                {isMobile ?
                    <div>
                        <Grid container spacing={1}>
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={10}>
                                <Box sx={{ mb: 1 }}>
                                    <Stack direction="column">
                                        <Typography
                                            variant="h4"
                                            sx={{ color: "#205375" }}>
                                            Hello Admin!
                                        </Typography>
                                        <Link to="/account">
                                            <Button sx={{ textTransform: "none", backgroundColor: "#088395", color: "white" }}>
                                                Return to User View
                                            </Button>
                                        </Link>
                                    </Stack>
                                </Box>
                                <Card sx={{ backgroundColor: "#8da6a9", minHeight: 300 }}>
                                    <DummyAdminMapEquipment />
                                    <Grid item xs={12}>
                                        <DummyMapAllUsers />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <DummyMapPostsAdmin />
                                    </Grid>
                                </Card>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                        </Grid>
                    </div>

                    : //is NOT mobile...
                    <div>
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                            <Link to="/account">
                                    <Button sx={{ textTransform: "none", backgroundColor: "#088395", color: "white", mx: 1, mt: 10 }}>
                                        Return to User View
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item xs={10}>
                                <Box sx={{ mb: 1 }}>
                                    <Typography
                                        variant="h4"
                                        sx={{ color: "#205375" }}>
                                        Hello Admin!
                                    </Typography>
                                </Box>
                                <Card sx={{ backgroundColor: "#8da6a9", minHeight: 500 }}>
                                    <DummyAdminMapEquipment />
                                    <Stack direction="row">
                                        <Grid item xs={6}>
                                            <DummyMapAllUsers />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <DummyMapPostsAdmin />
                                        </Grid>
                                    </Stack>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>}
            </motion.div>
        )
}
export default DummyAdminDashboard