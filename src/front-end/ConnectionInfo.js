import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from "@mui/material/Dialog";

import { SIZES, shared } from './functions';

import BackEndConnection from './BackEndConnection';
import SchemaDialog from './SchemaDialog';

const backend = BackEndConnection.INSTANCE();
const STATUS_CONNECTED = 'Connected ';
const STATUS_NOT_CONNECTED = 'Not Connected';
const FORBIDDEN_DBS = ['information_schema', 'performance_schema'];

const boxStyle = {
    marginRight: 10
}

export default function ConnectionInfo(props) {
    const [status, setStatus] = useState('Not Connected');
    const [host, setHost] = useState('localhost');
    const [database, setDatabase] = useState(null);
    const [selected, setSelected] = useState('');
    const [user, setUser] = useState('dbadmin');
    const [password, setPassword] = useState('washywashy');
    const [openDialog, setOpenDialog] = useState(false);
    const [schema, setSchema] = useState('');
    const [firstTime, setFirstTime] = useState(true);

    shared.callConnectionInfo = callConnectionInfo;

    function somethingChanged(e) {
        let key = e.code || "";
        let isEnter = key.toLowerCase().indexOf('enter') >= 0;
        if (e.target.name === 'host') {
            setStatus(STATUS_NOT_CONNECTED);
            setHost(e.target.value);
        } else if (e.target.name === "database") {
            setStatus(STATUS_NOT_CONNECTED);
            setSelected(e.target.value);
            setSchema(e.target.value);
        } else if (e.target.name === 'user') {
            setStatus(STATUS_NOT_CONNECTED);
            setSelected('');
            setUser(e.target.value);
        } else if (e.target.name === 'password') {
            setStatus(STATUS_NOT_CONNECTED);
            setPassword(e.target.value);
            if (isEnter) {
                connectToMysql();
            }
        }
    }

    async function connectToMysql(e) {
        let connectionStatus = await backend.connect({ host, selected, user, password });
        setStatus(connectionStatus ? STATUS_CONNECTED : STATUS_NOT_CONNECTED);
        props.callSetQueryOk(connectionStatus);

        setOpenDialog(true);

        let sql = 'SHOW DATABASES'
        let loadDatabase = await backend.executeSql({ sql });
        if (user === 'root') {
            setDatabase(loadDatabase.rows);
        } else {
            setDatabase(loadDatabase.rows.filter(d => FORBIDDEN_DBS.indexOf(d.Database) < 0))
        }


        let result = await backend.getSqlTables({ selected });
        if (result.error) {
            console.log(result.error);
        }
        shared.callGetSqlTables({
            action: 'available-tables',
            data: result.rows
        });

        let views = await backend.getSqlViews({ selected });
        if (views.error) {
            console.log(views.error);
        }
        shared.callGetSqlTables({
            action: 'available-data-in-views',
            data: views.rows,
            currDatabase: selected
        });
    }

    function callConnectionInfo(message) {
        if (message.action === 'refresh-the-page') {
            connectToMysql();
        }
    }

    function closeDialog() {
        setOpenDialog(false);
        setFirstTime(false);
    }

    return (
        <>
            <Box display='flex' style={{ width: SIZES.getRightBoxWidth() }}>
                <Box style={boxStyle}>
                    <div>Host:</div>
                    <TextField name='host' variant="outlined" value={host} onChange={(e) => somethingChanged(e)} />
                </Box>
                {database !== null &&
                    <Box style={boxStyle}>
                        <div>Schemas:</div>
                        <FormControl style={{ width: 200 }}>
                            <Select
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                name='database'
                                value={selected}
                                onChange={(e) => somethingChanged(e)}>
                                {database.map((e, i) => (Object.values(e).map((val, j) => (
                                    <MenuItem key={j} value={val}>{val}</MenuItem>))))}
                            </Select>
                        </FormControl>
                    </Box>}
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
                Connection Status: {!selected ? <span style={{ color: status === STATUS_CONNECTED ? '#27ae60' : '#D9330B', marginLeft: 10 }}> {status} to Database</span> :
                    <span style={{ color: status === STATUS_CONNECTED ? '#27ae60' : '#D9330B', marginLeft: 10 }}> {status} {!selected || ('to ' + schema + ' Schema')}</span>}
            </Box>

            {firstTime && openDialog && <Dialog onClose={() => closeDialog()} open={openDialog} maxWidth='sm'>
                <SchemaDialog closeDialog={closeDialog} />
            </Dialog>}
        </>
    );
}

