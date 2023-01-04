import React from "react";
import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import BackEndConnection from './BackEndConnection';
const backend = BackEndConnection.INSTANCE();

export default function GetSqlTables() {
    const [sqlMsg, setSqlMsg] = useState('show tables');
    const [tables, setTables] = useState(null);

    async function getSqlTables() {
        let result = await backend.getSqlTables({ sqlMsg });
        setTables(result.rows);
        if (result.error) {
            console.log(result.error);
        }
    }

    return (
        <Box styel={{ display: 'flex' }}>
            <Button style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }} variant="text" onClick={() => getSqlTables()}>Availabe Tables</Button>
            {tables !== null && tables.map((e, i) =>
                <ul key={i}>
                    {Object.values(e).map((val, j) => (
                        <li key={j}>{val}
                        </li>
                    ))}
                </ul>
            )}
        </Box>
    );

};
