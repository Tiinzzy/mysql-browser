import React from "react";

import Box from '@mui/material/Box';

import { shared } from './shared';
import './style.css';

class DisplayData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.callDisplayData = this.callDisplayData.bind(this);
        shared.callDisplayData = this.callDisplayData;
    }

    callDisplayData(message) {
        if (message.action === 'data-ready-for-display') {
            this.setState({ data: message.data });
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
                    </table>
                }
            </Box>
        );
    }
}
export default DisplayData;