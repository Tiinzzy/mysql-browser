import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { SIZES, shared } from './functions';

import BackEndConnection from './BackEndConnection';
const backend = BackEndConnection.INSTANCE();

const STATUS_CONNECTED = 'Connected to ';
const STATUS_NOT_CONNECTED = 'Not Connected';

const boxStyle = {
    marginRight: 10
}


export default function ConnectionInfo(props) {
    const [status, setStatus] = useState('Not Connected');
    const [host, setHost] = useState('localhost');
    const [database, setDatabase] = useState('tests');
    const [user, setUser] = useState('root');
    const [password, setPassword] = useState('washywashy');

    shared.callConnectionInfo = callConnectionInfo;

    function somethingChanged(e) {
        let key = e.code || "";
        let isEnter = key.toLowerCase().indexOf('enter') >= 0;

        if (e.target.name === 'host') {
            setHost(e.target.value);
        } else if (e.target.name === 'database') {
            setStatus(STATUS_NOT_CONNECTED);
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
        setStatus(connectionStatus ? STATUS_CONNECTED + database + ' Database' : STATUS_NOT_CONNECTED);
        props.callSetQueryOk(connectionStatus);

        let result = await backend.getSqlTables({ database });
        if (result.error) {
            console.log(result.error);
        }
        shared.callGetSqlTables({
            action: 'available-tables',
            data: result.rows
        });

        let views = await backend.getSqlViews({ database });
        if (views.error) {
            console.log(views.error);
        }
        shared.callGetSqlTables({
            action: 'available-data-in-views',
            data: views.rows,
            currDatabase: database
        });
    }

    function callConnectionInfo(message) {
        if (message.action === 'refresh-the-page') {
            connectToMysql();
        }
    }

    return (
        <>
            <Box display='flex' style={{ width: SIZES.getRightBoxWidth() }}>
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
                    <TextField name='password' variant="outlined" type='password' value={password}
                        onKeyDown={(e) => somethingChanged(e)}
                        onChange={(e) => somethingChanged(e)} />
                </Box>
                <Box style={boxStyle}>
                    <Button style={{ marginTop: 27.5 }} variant="outlined" onClick={(e) => connectToMysql(e)}>Connect</Button>
                </Box>
            </Box>
            <Box sx={{ mt: 2.5 }}>
                Connection Status: <span style={{ color: status === STATUS_CONNECTED + database + ' Database' ? 'green' : 'red', marginLeft: 10 }}> {status} </span>
            </Box>
        </>
    );
}