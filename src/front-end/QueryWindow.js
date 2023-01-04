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

import { shared } from './shared';

const backend = BackEndConnection.INSTANCE();

export default function QueryWindow() {
    const [sql, setSql] = useState('select 1 from dual');
    const [errorMsg, setErrorMsg] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

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
    }

    function handleCloseDialog() {
        setOpenDialog(false);
    }

    return (
        <>
            <Box>
                <TextField name='sql' variant="outlined"
                    fullWidth
                    value={sql}
                    multiline
                    rows={10}
                    onChange={(e) => sqlChanged(e)} />
            </Box>
            <Box display='flex'>
                <Button style={{ marginTop: 15 }} variant="outlined" onClick={() => executeSql()}>Execute</Button>
                <Box flexGrow={1} mt={4} ml={4} color='red'>
                    <Typography alignItems='center'> {errorMsg} </Typography>
                </Box>
            </Box>

            <Divider sx={{ mt: 2, mb: 2 }} />

            <DisplayData />

            {openDialog && <Dialog onClose={() => handleCloseDialog()} open={openDialog} maxWidth='sm' >
            <DialogContent handleCloseDialog={handleCloseDialog}/>
            </Dialog>}

        </>
    );
}