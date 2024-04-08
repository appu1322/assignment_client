import "./style.scss";
import { FC, ReactNode } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

interface props {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    title: string;
    isOpen: boolean;
    disabled?: boolean;
    confirmText?: string;
    onClose: () => void;
    onConfirm?: () => void;
    onSubmit?: () => void;
    children: ReactNode;
}

const CustomDialog: FC<props> = ({ size, title, isOpen, disabled, confirmText, onClose, onConfirm, onSubmit, children }) => (
    <div>
        <BootstrapDialog
            maxWidth={size}
            fullWidth
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
            scroll='paper'
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
                {title}
            </BootstrapDialogTitle>
            <form id="dialog-form" onSubmit={onSubmit}>
                <DialogContent >
                    {children}
                </DialogContent>
                {
                    !disabled &&
                    <DialogActions id="dialog-action">
                        <Button variant='outlined' size='medium' onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" size='medium' type="submit" autoFocus onClick={() => onConfirm && onConfirm()}>
                            { confirmText ? confirmText : "Save changes"}
                        </Button>
                    </DialogActions>
                }
            </form>
        </BootstrapDialog>
    </div>
);

CustomDialog.defaultProps = {
    size: "md",
    disabled: false
};

export default CustomDialog;
