import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid"
import Rating from "@mui/material/Rating"
import Typography from '@mui/material/Typography';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { Link } from "react-router-dom";

import { useState } from "react";

import { useGetReviewByUserQuery } from "../../redux/api";
import { useDeleteReviewForUserMutation } from "../../redux/api";

//<-----------------DELETE REVIEW HELPER FUNCTION------------------->

const MapPosts = () => {
    const [alert, setAlert] = useState(false);
    const [editForm, setEditForm] = useState(false);

    const [deleteReview, { isLoading: deleteIsLoading, Error: deleteError, data: deleteData }] = useDeleteReviewForUserMutation();
    const { data, error, isLoading } = useGetReviewByUserQuery();

    if (!data) {
        return <div> Oops, our own web equipment is broken. We should have the issue resolved soon! </div>
    }
    if (isLoading) {
        return <div> Loading... </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
    console.log(data);

    return (
        <>
            <Card sx={{ backgroundColor: "#D3E0E2", m: 1 }}>
                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: {
                            xs: "16px",
                            sm: "18px",
                            md: "20px",
                            lg: "24px",
                        }
                    }}>
                    My Reviews:
                </Typography>
                {data && data.map((review) => (
                    <Card key={review.id} sx={{ m: 1, p: 2 }}>
                        <Grid container>
                            <Grid item xs={8}>
                                <Typography
                                    sx={{
                                        textAlign: "center",
                                        fontSize: {
                                            xs: "12px",
                                            sm: "14px",
                                            md: "16px",
                                            lg: "18px",
                                        }
                                    }}>
                                    {review.title}
                                </Typography>
                                <Typography 
                                    sx={{
                                        textAlign: "center",
                                        fontSize: {
                                            xs: "12px",
                                            sm: "14px",
                                            md: "16px",
                                            lg: "18px",
                                        }
                                    }}>
                                    {review.equipment}
                                </Typography>
                                <Rating
                                    readOnly={true}
                                    value={review.rating}
                                />
                                <Typography
                                 sx={{
                                    textAlign: "center",
                                    fontSize: {
                                        xs: "10px",
                                        sm: "12px",
                                        md: "14px",
                                        lg: "16px",
                                    }
                                }}>
                                    {review.content}
                                </Typography>
                            </Grid>
                            <Grid item={4}>

                                <Link to={`/equipment/${review.id}/review`}>
                                    <Button
                                        variant="outlined"
                                        sx={{ m: 1 }}>
                                        <PreviewIcon />
                                    </Button>
                                </Link>

                                <Link to={`/edit_review/${review.id}`}>
                                    <Button
                                        variant="outlined"
                                        sx={{ m: 1 }}>
                                        <EditNoteIcon />
                                    </Button>
                                </Link>

                                <Button
                                    onClick={() => setAlert(true)}
                                    variant="outlined"
                                    color="error"
                                    sx={{ m: 1 }}>
                                    <DeleteForeverSharpIcon />
                                </Button>

                            </Grid>
                        </Grid>
                        {alert && <Alert severity="warning">
                            Are you sure you want to delete this post? Once you do it's gone forever.

                            <Button
                                onClick={() => deleteReview(review.id)}
                                variant="outlined"
                                color="error"
                                sx={{ m: 1 }}>
                                Yes, I want to delete this review
                            </Button>

                            <Button
                                variant="outlined"
                                onClick={() => setAlert(false)}
                                sx={{ m: 1 }}>
                                No, keep this review
                            </Button>
                        </Alert>
                        }
                    </Card>
                ))}
            </Card>
        </>
    )
}

export default MapPosts