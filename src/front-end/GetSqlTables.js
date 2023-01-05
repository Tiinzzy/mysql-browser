import React from "react";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import BackEndConnection from './BackEndConnection';

import { shared } from './functions';

const backend = BackEndConnection.INSTANCE();

class GetSqlTables extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openT: false,
            openV: false
        }
        this.callGetSqlTables = this.callGetSqlTables.bind(this);
        this.handleOpenTList = this.handleOpenTList.bind(this);
        this.handleOpenVList = this.handleOpenVList.bind(this);
        this.sendSqlCommand = this.sendSqlCommand.bind(this);
        shared.callGetSqlTables = this.callGetSqlTables;
    }

    callGetSqlTables(message) {
        if (message.action === 'available-tables') {
            this.setState({ tables: message.data });
        } else if (message.action === 'available-data-in-views' && message.currDatabase === 'sys' ) {
            this.setState({ views: message.data });
        }
    }

    handleOpenTList() {
        this.setState({ openT: (!this.state.openT) })
    }

    handleOpenVList() {
        this.setState({ openV: (!this.state.openV) })
    }

    async sendSqlCommand(data) {
        let sql = 'SELECT * FROM ' + data;
        let result = await backend.selectAllSql({ sql });
        if (result.error) {
            console.log(result.error);
        }
        shared.callDisplayData({ action: 'table-clicked-data', data: result.rows });
        shared.callQueryWindow({ action: 'change-command', command: sql });
    }

    render() {
        return (
            <Box style={{ border: 'solid 0px green' }}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav">
                    <ListItemButton onClick={() => this.handleOpenTList()}>
                        <ListItemText primary="Tables" />
                        {this.state.openT ? <ExpandLess /> : <ExpandMore /> }
                    </ListItemButton>
                    <Collapse in={this.state.openT} timeout="auto" unmountOnExit>
                        {this.state.tables && this.state.tables.map((e, i) =>
                            <List component="div" disablePadding key={i}>
                                {Object.values(e).map((val, j) => (
                                    <ListItemButton sx={{ pl: 4 }} key={j}>
                                        <ListItemText primary={val} onClick={() => this.sendSqlCommand(val)} />
                                    </ListItemButton>
                                ))}
                            </List>
                        )}
                    </Collapse>
                </List>

                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav">
                    <ListItemButton onClick={() => this.handleOpenVList()}>
                        <ListItemText primary="Views" />
                        {this.state.openV ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={this.state.openV} timeout="auto" unmountOnExit>
                        {this.state.views && this.state.views.map((e, i) =>
                            <List component="div" disablePadding key={i}>
                                {Object.values(e).map((val, j) => (
                                    <ListItemButton sx={{ pl: 4 }} key={j}>
                                        <ListItemText primary={val} />
                                    </ListItemButton>
                                ))}
                            </List>
                        )}
                    </Collapse>
                </List>
            </Box>
        );
    }
}
export default GetSqlTables;
