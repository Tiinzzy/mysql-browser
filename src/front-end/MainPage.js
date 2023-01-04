import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import ConnectionInfo from './ConnectionInfo';
import QueryWindow from './QueryWindow';
import GetSqlTables from './GetSqlTables';

import { SIZES } from './functions';

const leftBoxStyle = {
    overflowY: 'scroll',
    border: 'solid 1px #eaeaea',
    borderRadius: 3,
    flexDirection: 'column',
    marginTop: 28,
    width: SIZES.leftBoxWidth,
    maxHeight: 865,
    overflowY: 'scroll'
}

const rightBoxStyle = function (width) {
    return {
        border: 'solid 0px blue',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        width: width
    }
}

export default function MainPage() {
    const [queryOk, setQueryOk] = useState(false);
    const [width, setWidth] = useState(window.innerWidth - 20);


    window.addEventListener("resize", handleScreenResize);


    function callSetQueryOk(isOk) {
        setQueryOk(isOk);
    }

    function handleScreenResize() {
        setWidth(window.innerWidth - 20);
    }

    return (
        <Box style={rightBoxStyle(width)}>
            <Box style={leftBoxStyle}>
                <GetSqlTables />
            </Box>
            <Box flexGrow={1} style={{ margin: 10 }}>
                <ConnectionInfo callSetQueryOk={callSetQueryOk} width={SIZES.getRightBoxWidth()} />
                <Divider sx={{ mt: 2, mb: 2 }} />
                {queryOk && <QueryWindow />}
            </Box>
        </Box>

    );
}