import React from "react";
import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import BackEndConnection from './BackEndConnection';
const backend = BackEndConnection.INSTANCE();

export default function GetSqlTables() {
    const [sqlMsg, setSqlMsg] = useState('show tables');

    async function getSqlTables() {
        let result = await backend.getSqlTables({ sqlMsg });
        console.log(result.rows)
        if (result.error) {
            console.log(result.error);
        }
    }

    return (
        <Box styel={{display:'flex' }}>
            <Button style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }} variant="outlined" onClick={() => getSqlTables()}>Get Tables</Button>
        </Box>
    );

};
