import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Dialog from "@mui/material/Dialog";

import BackEndConnection from './BackEndConnection';
import DisplayData from './DisplayData';
import DialogContent from './DialogContent';

import { SIZES, shared } from './functions';

const backend = BackEndConnection.INSTANCE();

export default function QueryWindow(props) {
    const [sql, setSql] = useState('select 1 from dual');
    const [errorMsg, setErrorMsg] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [checkBox, setCheckBox] = useState(false);

    shared.callQueryWindow = callQueryWindow;

    function sqlChanged(e) {
        setSql(e.target.value);
    }

    async function executeSql() {
        let result = await backend.executeSql({ sql });
        setErrorMsg(result.error);
        shared.callDisplayData({ action: 'data-ready-for-display', data: result.rows });
        if (result.error) {
            console.log(result.error);
        }
        setOpenDialog(true);

        if (checkBox) {
            setOpenDialog(false);
        };
    }

    function handleCloseDialog(message) {
        setOpenDialog(false);
        if (message.status === true) {
            setCheckBox(true);
        }
    }

    function callQueryWindow(message) {
        if (message.action === 'change-command') {
            setSql(message.command);
            setErrorMsg('');
        }
    }

    return (
        <Box>
            <Box>
                <TextField style={{ width: SIZES.getRightBoxWidth() }}
                    name='sql'
                    variant="outlined"
                    value={sql}
                    multiline
                    rows={8}
                    onChange={(e) => sqlChanged(e)} />
            </Box>

            <Box display='flex'>
                <Button style={{ marginTop: 15 }} variant="outlined" onClick={() => executeSql()}>Execute</Button>
                <Box style={{ marginLeft: 20, marginTop: 20 }} color='red'>
                    <Typography alignItems='center'> {errorMsg} </Typography>
                </Box>
            </Box>

            <Divider sx={{ mt: 2, mb: 2 }} />

            <DisplayData />

            {openDialog && <Dialog onClose={() => handleCloseDialog()} open={openDialog} maxWidth='sm' >
                <DialogContent handleCloseDialog={handleCloseDialog} />
            </Dialog>}
        </Box>
    );
}