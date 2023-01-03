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
        console.log(message.data.length)
        if (message.action === 'data-ready-for-display') {
            this.setState({ data: message.data });

            let size = message.data.length;
            if (size > 1000) {
                this.setState({ data: message.data.slice(0,1001) });
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
                    </table>
                }
            </Box>
        );
    }
}
export default DisplayData;

//style={{border: 'solid 1px red', padding: 10, width: 1360, height: 400}}