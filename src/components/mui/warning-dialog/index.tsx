import "./index.scss";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { FC, MouseEvent } from "react";
interface props {
    isOpen: boolean;
    title: string;
    description: string;
    onClose: (e: MouseEvent<HTMLElement>) => void;
    onConfirm: (e: MouseEvent<HTMLElement>) => void;
}

const WarningDialog: FC<props> = ({ isOpen, title, description, onClose, onConfirm }) => (
    <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="custom-dialog-root"
    >
        <DialogTitle id="alert-dialog-title">
            {title}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {description}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button variant='outlined' onClick={onClose}>Cancel</Button>
            <Button onClick={onConfirm} autoFocus>
                Confirm
            </Button>
        </DialogActions>
    </Dialog>
);

export default WarningDialog;