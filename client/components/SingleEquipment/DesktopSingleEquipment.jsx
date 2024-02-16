import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AspectRatio from '@mui/joy/AspectRatio';
import RateReviewIcon from '@mui/icons-material/RateReview';

import { motion } from "framer-motion";

import { Link, useParams } from "react-router-dom";

import { useGetReviewByEquipmentQuery, useGetSingleEquipmentQuery } from "../../redux/api";
import { useGetUserQuery } from "../../redux/api";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import ProvideUsername from "../SingleReview/ProvideUsername";

const DesktopSingleEquipment = () => {
    const { id } = useParams();
    const token = useSelector((state) => state.auth.token);

    const { data, error, isLoading } = useGetSingleEquipmentQuery(id);
    const { data: userData, error: userError, isLoading: userIsLoading } = useGetUserQuery();
    const { data: reviewData, error: reviewError, isLoading: reviewIsLoading } = useGetReviewByEquipmentQuery(id);

    const avgRating = useMemo(() => {
        if (!reviewData) return 0;
        let sum = 0;
        for (let i = 0; i < reviewData.length; i++) {
            sum = sum + reviewData[i].rating;
        };
        return sum / (reviewData.length);
    }, [reviewData])

    if (isLoading) {
        return <div> </div>
    }
    if (error) {
        return <div> Sorry! There's a problem loading the equipment. </div>
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}>
                <Grid container>
                    <Grid item xs={8}>
                        <Card
                            key={data.id}
                            sx={{ mt: 5, mx: 2, p: 2, backgroundColor: "#b6d6d4" }}>
                            <Stack direction="column">
                                <Stack direction="column">
                                    <Typography variant="h3" sx={{ color: "#205375" }}>
                                        {data.name}
                                    </Typography>
                                    <Box sx={{ my: 1, p: 1 }}>
                                        <Stack direction="row">
                                            <Typography sx={{ color: "#205375", fontSize: "30px" }}>
                                                Average Rating:
                                            </Typography>
                                            <Rating
                                                readOnly={true}
                                                value={avgRating}
                                                sx={{ alignContent: "center", m: 1 }}
                                            />
                                        </Stack>
                                    </Box>
                                </Stack>
                                <Card sx={{ m: 1, p: 3 }}>
                                    <AspectRatio objectFit="contain" >
                                        <img
                                            src={data.image}
                                            alt={data.name}
                                            width={200} />
                                    </AspectRatio>
                                </Card>
                                <Stack direction="row">
                                    <Card sx={{ m: 1 }}>
                                        <Typography sx={{ color: "#205375", p: 1 }}>
                                            <b>Brand:</b> {data.brand}
                                        </Typography>
                                    </Card>
                                    <Card sx={{ m: 1 }}>
                                        <Typography sx={{ color: "#205375", p: 1 }}>
                                            <b>Price:</b> ${data.priceRating}
                                        </Typography>
                                    </Card>
                                    <Card sx={{ m: 1 }}>
                                        <Typography sx={{ color: "#205375", p: 1 }}>
                                            <a href={data.purchaseLink} target="_blank">Buy it here</a>
                                        </Typography>
                                    </Card>
                                </Stack>
                                <Card sx={{ m: 1 }}>
                                    <Typography sx={{ color: "#205375", p: 1 }}>
                                        <b>Description:</b> {data.description}
                                    </Typography>
                                </Card>
                            </Stack>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{ mt: 5, mx: 2, backgroundColor: "#82C4C1", p: 2 }}>
                            <Typography variant="h4" sx={{ textAlign: "center", color: "#205375" }}>
                                Reviews:
                            </Typography>
                            {token &&
                                <Link to="/new_review">
                                    <button className="critique-button">
                                        Add a Review
                                    </button>
                                </Link>
                            }
                            {reviewData && reviewData.map((review) => (
                                <Card key={review.id} sx={{ m: 1, p: 1 }}>
                                    <Stack direction="column">
                                        <Link to={`/review/${review.id}`}>
                                            <Button sx={{ textTransform: "none", color: "white" }}>
                                                <Typography variant="h5" sx={{ color: "#205375" }}>
                                                    {review.title}
                                                </Typography>
                                            </Button>
                                        </Link>
                                        <Rating
                                            readOnly={true}
                                            value={review.rating}
                                            size="small"
                                            sx={{ alignContent: "center", m: 1 }}
                                        />
                                        <Typography sx={{ color: "#205375" }}>
                                            {review.content}
                                        </Typography>
                                        <ProvideUsername userId={review.userId} />
                                    </Stack>
                                </Card>
                            ))}
                        </Card>
                    </Grid>
                </Grid>
                {!userData || userData.isAdmin === false
                    ? //If not admin.... 
                    <div>
                    </div>
                    : //If admin...
                    <div>
                        <Link to={`/edit_equipment/${data.id}`} >
                            <Button sx={{ textTransform: "none", }}>
                                Edit Equipment
                            </Button>
                        </Link>
                    </div>
                }
        </motion.div>
    )
}

export default DesktopSingleEquipment;