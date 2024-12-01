import Typography from "@mui/material/Typography";
import { useGetAllUsersValidationQuery } from "../../redux/api";

const ProvideUsername = ({ userId }) => {
    const { data, isLoading } = useGetAllUsersValidationQuery();
    if (isLoading) {
        return <div></div>
    }

    console.log(data);
    const author = data.find((user) => { return user.id === userId });

    return (
        <Typography align='right' sx={{ color: '#8F8F8F' }}>
            {author.username}
        </Typography>
    )
}

export default ProvideUsername