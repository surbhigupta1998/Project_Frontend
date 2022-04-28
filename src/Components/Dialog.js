import React, {useState} from 'react';
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

    const [data, setData] = useState({
        heading: title,
        content: text
    })

    const handleSubmit = () =>{
        let heading,content;
        if(data.heading === null)
            heading = title;
        else
            heading = data.heading
        if(data.content === null)
            content = text
        else
            content = data.content
        axios.put("http://localhost:7000/blog/update",{id,title:heading,text:content})
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
                    <div className='container' title='click here to edit title' contentEditable={true} onInput={e=>setData({...data,heading:e.currentTarget.textContent})} name="heading">{title}</div>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <div className='container' title='click here to edit text' contentEditable={true} onInput={e=>setData({...data,content:e.currentTarget.textContent})} name="content">{text?renderHTML(text):null}</div>
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