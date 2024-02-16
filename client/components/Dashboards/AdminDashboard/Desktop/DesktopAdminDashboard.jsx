import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import DesktopMapAllUsers from "./components/DesktopMapUsers";
import DesktopAddEquipment from "./components/DesktopAddEquipment";
import DesktopAdminMapPosts from "./components/DesktopAdminMapPosts";
import DesktopAdminMapEquip from "./components/DesktopAdminMapEquip";

const DesktopAdminDashboard = () => {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <Link to="/account">
                        <Box sx={{ mt: 5}}>
                            <button className="dash-critique-button">
                                Return to User View
                            </button>
                        </Box>
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
                    <Card
                        className="dashboard-background"
                        elevation={10}
                        sx={{ mr: 10}}>
                        <DesktopAddEquipment />
                        <DesktopAdminMapEquip />
                        <Stack direction="row">
                            <Grid item xs={6}>
                                <DesktopMapAllUsers />
                            </Grid>
                            <Grid item xs={6}>
                                <DesktopAdminMapPosts />
                            </Grid>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </motion.div>
    )
}
export default DesktopAdminDashboard