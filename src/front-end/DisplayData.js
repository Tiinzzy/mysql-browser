import React from "react";

import { shared } from './shared';

class DisplayData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        shared.callDisplayData = this.callDisplayData;
    }

    callDisplayData(message) {
        if (message.action === 'data-ready-for-display') {
            this.setState({ data: message.data });
        }
    }

    render() {
        return (
            <>
            </>
        );
    }
}
export default DisplayData;