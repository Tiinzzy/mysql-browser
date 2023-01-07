import React from "react";

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import DialogTitle from "@mui/material/DialogTitle";

import './style.css';

class SchemaDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            closeDialog: props.closeDialog
        }
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    handleCloseDialog(e) {
        this.state.closeDialog();
    }

    render() {
        return (
            <Box>
                <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box className='dialMsg'>Important</Box>
                    <Box className="closeBtn" onClick={(e) => this.handleCloseDialog(e)}>X</Box>
                </DialogTitle>
                <Divider sx={{ mb: 2 }} />
                <Box className='boxMsg'>
                    You're connected to database, Please select from the available Schemas and connect again
                </Box>
            </Box>
        );
    }
}
export default SchemaDialog;
