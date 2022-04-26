import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { toast } from 'react-toastify';
import renderHTML from 'react-render-html';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ minWidth: '30vw' }} {...other}>
            {children}
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500]
                }}
            >
                <CloseIcon />
            </IconButton>
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({ isOpenDialog = false, handleClose, title, text, id }) {

    const [data, setData] = React.useState({
        heading: title,
        content: text
    })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = () =>{
        axios.put("http://localhost:7000/posts/update",{id,title:data.heading,text:data.content})
            .then(response=>{
                if(response.status === 204)
                    toast.success("Blog Updated Successfully")
                else
                    toast.error("Oops!! Something went wrong")
                handleClose()
            }).catch(error=>{
                toast.error(error.response.data.msg)
                handleClose()
            })
    }

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={isOpenDialog}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <input type="text" defaultValue={title} value={data.heading} name="heading" onChange={handleChange}></input>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <input type="text" defaultValue={text} value={data.content} name="content" onChange={handleChange}></input>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSubmit}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}