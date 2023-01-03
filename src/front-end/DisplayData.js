import React from "react";

import Box from '@mui/material/Box';

import { shared } from './shared';
import './style.css';

class DisplayData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            table: ''

        }
        this.callDisplayData = this.callDisplayData.bind(this);
        shared.callDisplayData = this.callDisplayData;
    }

    callDisplayData(message) {
        if (message.action === 'data-ready-for-display') {
            this.setState({ data: message.data });

            let size = message.data.length;
            if (size > 1000) {
                this.setState({ data: message.data.slice(0, 1001) });
            }

            let tblCrt = message.data[0];
            if (Object.keys(tblCrt)[1].indexOf('Create Table') > -1) {
                this.setState({ table: Object.values(tblCrt)[1] }, function () {
                    this.setState({data: null})
                });
            }

        }
    }

    render() {
        return (
            <Box>
                {this.state.data &&
                    <table>
                        <tbody >
                            <tr key={"header"}>
                                {Object.keys(this.state.data[0]).map((e) => (
                                    <th>{e}</th>
                                ))}
                            </tr>
                            {this.state.data.map((e, i) => (
                                <tr key={i} id='data'>
                                    {Object.values(e).map((val) => (
                                        <td>{val}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>}
                {this.state.table}
            </Box>
        );
    }
}
export default DisplayData;
