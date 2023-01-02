import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import BackEndConnection from './BackEndConnection';
const backend = BackEndConnection.INSTANCE();

const STATUS_CONNECTED = 'CONNECTED';
const STATUS_NOT_CONNECTED = 'NOT CONNECTED';

const boxStyle = {
    marginRight: 10
}

export default function ConnectionInfo() {
    const [status, setStatus] = useState('NOT CONNECTED');
    const [host, setHost] = useState('localhost');
    const [database, setDatabase] = useState('tests');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    function somethingChanged(e) {
        let key = e.code || "";
        let isEnter = key.toLowerCase().indexOf('enter') >= 0;
       
        if (e.target.name === 'host') {
            setHost(e.target.value);
        } else if (e.target.name === 'database') {
            setDatabase(e.target.value);
        } else if (e.target.name === 'user') {
            setUser(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
            if (isEnter) {
                connectToMysql();
            }
        }
    }

    async function connectToMysql(e) {
        let connectionStatus = await backend.connect({ host, database, user, password });
        setStatus(connectionStatus ? STATUS_CONNECTED : STATUS_NOT_CONNECTED);
    }

    return (
        <>
            <Box display='flex'>
                <Box style={boxStyle}>
                    <div>Host:</div>
                    <TextField name='host' variant="outlined" value={host} onChange={(e) => somethingChanged(e)} />
                </Box>
                <Box style={boxStyle}>
                    <div>Database:</div>
                    <TextField name='database' variant="outlined" value={database} onChange={(e) => somethingChanged(e)} />
                </Box>
                <Box style={boxStyle}>
                    <div>User:</div>
                    <TextField name='user' variant="outlined" value={user} onChange={(e) => somethingChanged(e)} />
                </Box>
                <Box style={boxStyle}>
                    <div>Password:</div>
                    <TextField name='password' variant="outlined" type='password1' value={password}
                        onKeyDown={(e) => somethingChanged(e)}
                        onChange={(e) => somethingChanged(e)} />
                </Box>
                <Box style={boxStyle}>
                    <Button style={{ marginTop: 27.5 }} variant="outlined" onClick={(e) => connectToMysql(e)}>Connect</Button>
                </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
                Connection Status: <span style={{ color: status === STATUS_CONNECTED ? 'green' : 'red' }}> {status} </span>
            </Box>
        </>
    );
}