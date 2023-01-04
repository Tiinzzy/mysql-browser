import React from "react";

import Box from '@mui/material/Box';

import { shared } from './shared';

class GetSqlTables extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.callGetSqlTables = this.callGetSqlTables.bind(this);
        shared.callGetSqlTables = this.callGetSqlTables;
    }

    callGetSqlTables(message) {
        if (message.action === 'available-tables') {
            this.setState({ tables: message.data });
        }
    }

    render() {
        return (
            <Box style={{ border: 'solid 0px green' }}>
                <Box style={{ paddingTop: 15, paddingLeft: 20, paddingRight: 30 }}>
                    Availabe Tables
                </Box>
                {this.state.tables && this.state.tables.map((e, i) =>
                    < ul key={i} >
                        {Object.values(e).map((val, j) => (
                            <li onClick={() => {alert(val)}} key={j} style={{ cursor:'pointer', spacing: 'compact' }} >{val}
                            </li>
                        ))}
                    </ul>
                )}
            </Box>
        );
    }
}
export default GetSqlTables;
