import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { toast } from 'react-toastify'
import React from 'react'

const useStyles = makeStyles(() => ({
    cancelBtn: {
        fontWeight: 500,
        padding: "7px 5px",
        minWidth: 100,
        borderRadius: "2px",
        boxShadow: "none",
        backgroundColor: "white",
        border: "1px solid #c2c2c2",
        textTransform: "uppercase",
        textAlign: "center",
        "&:hover": {
            cursor: "pointer",
            color: "#2874f0",
        },
    },
}));

export default function AlertDialogBox({ id, isOpenDialog = false, handleClose }) {

    const classes = useStyles();

    const removeItem = () => {
        axios.delete(`http://localhost:7000/posts/delete/${id}`)
            .then(response => {
                if (response.status === 204)
                    toast.success("Blog deleted successfully")
                else
                    toast.error("Oops!! Something went wrong")
                handleClose();
            }).catch(error => {
                toast.error(error.response.data.msg)
                handleClose();
            })
    };

    return (
        <div>
            <Dialog
                open={isOpenDialog}
                maxWidth={"md"}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Remove Blog</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        style={{ marginLeft: "8%" }}
                        id="alert-dialog-slide-description"
                    >
                        Are you sure you want to remove this blog?
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        margin: "15px 0",
                    }}
                >
                    <button
                        onClick={handleClose}
                        className={classes.cancelBtn}
                    >
                        Cancel
                    </button>
                    <Button
                        onClick={removeItem}
                        style={{ background: "#2874f0" }}
                        variant="contained"
                    >
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}