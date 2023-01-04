import React from "react";

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

class DialogContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            handleCloseDialog: props.handleCloseDialog,
            checkBox: false
        }
        this.closeDialog = this.closeDialog.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
    }

    closeDialog(e) {
        let checked = { message: 'check-box', status: this.state.checkBox }
        this.state.handleCloseDialog(checked);
    }

    handleCheckBox(e) {
        this.setState({ checkBox: e.target.checked });
    }

    render() {
        return (
            <Box>
                <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box style={{ fontWeight: 'bold' }}>Important</Box>
                    <Box style={{ border: 'solid 1px black', height: 30, width: 30, textAlign: 'center', cursor: 'pointer' }} onClick={(e) => this.closeDialog()}>X</Box>
                </DialogTitle>
                <Divider sx={{ mb: 2 }} />
                <Box style={{ marginLeft: 24, marginBottom: 25, marginRight: 25 }}>
                    If the data you have selected has more than 1000 rows, we automatically show you the first 1000
                </Box>
                <Box style={{ marginLeft: 24, marginBottom: 25, marginRight: 25 }}>
                    If you would like have access tp the rest of the data, set the to:
                    <div>
                        <span style={{ fontWeight: 'bold', color: '#4683E4' }}> LIMIT </span>
                        (the starting point #, the # of data you want to view)
                    </div>
                    <p>
                        *Example: <span style={{ marginLeft: 10 }}> SELECT * FROM your_table LIMIT (2000, 30)</span>
                    </p>
                </Box>
                <Box style={{ marginLeft: 24, marginBottom: 25, marginRight: 25 }}>
                    <FormControlLabel control={<Checkbox checked={this.state.checkBox} onChange={(e) => this.handleCheckBox(e)} />} label="Dont Show This Message Again" />
                </Box>
            </Box>
        );
    }
}
export default DialogContent;
