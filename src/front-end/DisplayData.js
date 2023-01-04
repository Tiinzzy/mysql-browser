import React from "react";

import Box from '@mui/material/Box';

import { shared } from './shared';
import { BoxHeight, BoxWidth, createTable2Lines } from './functions';

import './style.css';

class DisplayData extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            createTable: '',
            height: BoxHeight(),
            width: BoxWidth()
        }

        this.callDisplayData = this.callDisplayData.bind(this);
        this.handleScreenResize = this.handleScreenResize.bind(this);
        shared.callDisplayData = this.callDisplayData;
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleScreenResize);
    }

    handleScreenResize() {
        this.setState({ height: BoxHeight(), width: BoxWidth() });
    }

    callDisplayData(message) {
        if (message.action === 'data-ready-for-display') {
            this.setState({ data: message.data, createTable: '' });
            let size = message.data.length;
            if (size === 0) {
                this.setState({ data: [], createTable: '' });
            } else {
                let isCreateTable = message.data[0].hasOwnProperty('Create Table');
                if (isCreateTable) {
                    let tblCrt = message.data[0];
                    this.setState({ createTable: Object.values(tblCrt)[1] }, function () {
                        this.setState({ data: null });
                    });
                }
            }
        }
    }

    render() {
        return (
            <Box style={{ height: this.state.height, overflowY: 'scroll', border: 'solid 1px #eaeaea', width: this.state.width }}>
                {this.state.data && this.state.data.length > 0 &&
                    <table>
                        <tbody >
                            <tr key={"header"}>
                                <th>#</th>
                                {Object.keys(this.state.data[0]).map((e, i) => (
                                    <th key={i}>{e}</th>
                                ))}
                            </tr>
                            {this.state.data.map((e, i) => (
                                <tr key={i} id='data'>
                                    <td>{1 + i}</td>
                                    {Object.values(e).map((val, j) => (
                                        <td key={j}>{val}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>}

                {createTable2Lines(this.state.createTable).map((l, i) => (
                    <div key={i}>
                        {l}
                    </div>
                ))}
            </Box>
        );
    }
}
export default DisplayData;
