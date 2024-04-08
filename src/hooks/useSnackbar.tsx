import { SnackbarKey, useSnackbar as snackbarHook } from "notistack";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type variant = "warning" | "default" | "error" | "success" | "info"

const useSnackbar = () => {
    const { enqueueSnackbar, closeSnackbar } = snackbarHook();

    const action = (key: SnackbarKey | undefined) => (
        <IconButton
            size="small"
            onClick={() => {
                closeSnackbar(key);
            }}
        >
            <CloseIcon sx={{ color: "#fff" }} />
        </IconButton>
    );

    const snackbar = (message = "Please enter", variant: variant = "warning", persist?: boolean) => enqueueSnackbar(
        <Typography
            className="ml-2"
            variant="body1"
        >
            {message}
        </Typography>,
        {
            persist,
            variant,
            style: { backgroundColor: variant === "info" ? "#118CFC" : "default" },
            anchorOrigin: {
                vertical: "top",
                horizontal: "right",
            },
            action: !persist && action,
        });

    return { snackbar, closeSnackbar };
};

export default useSnackbar;