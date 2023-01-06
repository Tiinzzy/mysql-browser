import React from "react";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

import { shared } from './functions';

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
        this.refreshData = this.refreshData.bind(this);
    }

    componentDidMount() {
        shared.callGetSqlTables = this.callGetSqlTables;
    }

    callGetSqlTables(message) {
        if (message.action === 'available-tables') {
            this.setState({ tables: message.data });
        } else if (message.action === 'available-data-in-views') {
            this.setState({ views: message.data });
        }
    }

    handleOpenTList() {
        this.setState({ openT: (!this.state.openT) })
    }

    handleOpenVList() {
        this.setState({ openV: (!this.state.openV) })
    }

    sendSqlCommand(data) {
        let sql = 'SELECT * FROM ' + data;
        shared.callQueryWindow({ action: 'change-command', command: sql });
        shared.callDisplayData({ action: 'table-clicked-sql', sql: sql });
    }

    refreshData() {
        shared.callConnectionInfo({ action: 'refresh-the-page' })
    }

    render() {
        return (
            <Box style={{ border: 'solid 0px green' }}>
                <Box style={{ marginLeft: 10, marginTop: 5 }}>
                    <IconButton onClick={(e) => this.refreshData(e)}>
                        <RefreshIcon />
                    </IconButton>
                </Box>

                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav">
                    <ListItemButton onClick={() => this.handleOpenTList()}>
                        <ListItemText primary="Tables" />
                        {this.state.openT ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={this.state.openT} timeout="auto" unmountOnExit>
                        {this.state.tables && this.state.tables.map((e, i) =>
                            <List component="div" disablePadding key={i}>
                                {Object.values(e).map((val, j) => (
                                    <ListItemButton sx={{ pl: 4 }} key={j} onClick={() => this.sendSqlCommand(val)}>
                                        <ListItemText primary={val} />
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
                                    <ListItemButton sx={{ pl: 4 }} key={j} onClick={() => this.sendSqlCommand(val)}>
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
