import "./style.scss";
import TableChartIcon from "@mui/icons-material/TableChart";
import { Box, Typography } from "@mui/material";
import { FC } from "react";

interface props {
    Icon?: JSX.Element
    errorMessage?: string;
    fullHeight?: boolean;
}

const ErrorMessage: FC<props> = ({ Icon, errorMessage, fullHeight }) => (
        <Box className='no-data center' height={fullHeight ? "100%" : "calc(100% - 80px)"}>
            {Icon}
            <Typography className='noData-title'>
                No data to show!
            </Typography>
            <Typography className='noData-sub-title'>
                {errorMessage}
            </Typography>
        </Box>
    );

ErrorMessage.defaultProps = {
    fullHeight: false,
    Icon: <TableChartIcon fontSize='large' className='error-icon' />,
    errorMessage: "Add some data to see"
};

export default ErrorMessage;