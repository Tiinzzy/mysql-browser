import React from "react";

import Box from '@mui/material/Box';

import { boxHeight, createTable2Lines } from './functions';

import { SIZES, shared } from './functions';

import './style.css';

class DisplayData extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            createTable: '',
            height: boxHeight(),
            width: props.width
        }

        this.callDisplayData = this.callDisplayData.bind(this);
        this.handleScreenResize = this.handleScreenResize.bind(this);
        shared.callDisplayData = this.callDisplayData;
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleScreenResize);
    }

    handleScreenResize() {
        this.setState({ height: boxHeight() });
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
        } else if (message.action === 'table-clicked-data') {
            this.setState({ data: message.data });
            let size = message.data.length;
            if (size === 0) {
                this.setState({ data: [], createTable: '' });
            }
        }
    }

    render() {
        return (
            <Box className='displayBox' style={{ height: this.state.height, width: SIZES.getRightBoxWidth(), overflowY: 'scroll'}}>
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
                                <tr key={i}>
                                    <td>{1 + i}</td>
                                    {Object.values(e).map((val, j) => (
                                        <td key={j}>{val}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>}

                {createTable2Lines(this.state.createTable).map((l, i) => (
                    <div key={i} className="createTableDiv">
                        {l}
                    </div>
                ))}
            </Box>
        );
    }
}
export default DisplayData;
