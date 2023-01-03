import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

import BackEndConnection from './BackEndConnection';
import DisplayData from './DisplayData';

import { shared } from './shared';

const backend = BackEndConnection.INSTANCE();

export default function QueryWindow() {
    const [sql, setSql] = useState('select 1 from dual');

    function sqlChanged(e) {
        setSql(e.target.value);
    }

    async function executeSql() {
        let result = await backend.executeSql({ sql });
        console.log(result);
        shared.callDisplayData({ action: 'data-ready-for-display', data: result.rows })
        if (result.error) {
            console.log(result.error);
        }
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
            <Box>
                <Button style={{ marginTop: 27.5 }} variant="outlined" onClick={() => executeSql()}>Execute</Button>
            </Box>

            <Divider sx={{ mt: 2, mb: 2 }} />

            <DisplayData />

        </>
    );
}