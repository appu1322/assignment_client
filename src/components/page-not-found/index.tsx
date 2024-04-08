import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useLottie } from "lottie-react";
import Error from "../../assets/lottie/error.json";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Error,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

const PageNotFound = () => {
    const error = useRouteError();
    const { View } = useLottie(defaultOptions);

    return (
        <Box className="center" flexDirection='column' height='70vh'>
            {View}
            <Typography variant="h3">Oops!</Typography>
            <Typography variant="h6">Sorry, an unexpected error has occurred.</Typography>
            <Typography variant="body1">
                <i>{isRouteErrorResponse(error) && error?.statusText || isRouteErrorResponse(error) && error?.data || ""}</i>
            </Typography>
        </Box>
    );
};

export default PageNotFound;
