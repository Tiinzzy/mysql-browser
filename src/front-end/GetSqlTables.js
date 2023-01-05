import React from "react";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { shared } from './functions';

class GetSqlTables extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            opne: true
        }
        this.callGetSqlTables = this.callGetSqlTables.bind(this);
        shared.callGetSqlTables = this.callGetSqlTables;
    }

    callGetSqlTables(message) {
        if (message.action === 'available-tables') {
            this.setState({ tables: message.data });
        }
    }

    handleClick() {
        this.setState({ open: (!this.state.open) })
    }

    render() {
        return (
            <Box style={{ border: 'solid 0px green' }}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav">
                    <ListItemButton onClick={() => this.handleClick()}>
                        <ListItemText primary="Availabe Tables" />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        {this.state.tables && this.state.tables.map((e, i) =>
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
