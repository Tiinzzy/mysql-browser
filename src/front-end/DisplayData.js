import React from "react";

import Box from '@mui/material/Box';

import BackEndConnection from './BackEndConnection';

import { boxHeight, createTable2Lines, SIZES, shared } from './functions';

import './style.css';

const backend = BackEndConnection.INSTANCE();

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
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleScreenResize);
        shared.callDisplayData = this.callDisplayData;
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
            let size = message.data.length;
            if (size === 0) {
                this.setState({ data: [], createTable: '' });
            } else {
                this.setState({ data: message.data });
            }
        } else if (message.action === 'table-clicked-sql') {
            backend.selectAllSql({ sql: message.sql }, (data) => {
                this.setState({ data: [] }, function () {
                    this.setState({ data: data.rows });
                });
            });
        }
    }

    render() {
        return (
            <Box className='displayBox' style={{ height: this.state.height, width: SIZES.getRightBoxWidth(), overflowY: 'scroll' }}>
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
