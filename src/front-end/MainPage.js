import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import ConnectionInfo from './ConnectionInfo';
import QueryWindow from './QueryWindow';
import GetSqlTables from './GetSqlTables';
import Footer from './Footer';

import { SIZES, rightBoxStyle } from './functions';

const leftBoxStyle = {
    overflowY: 'scroll',
    border: 'solid 1px #eaeaea',
    borderRadius: 3,
    flexDirection: 'column',
    marginTop: 19,
    width: SIZES.leftBoxWidth,
    maxHeight: 865,
    marginRight: 10
}

export default function MainPage() {
    const [queryOk, setQueryOk] = useState(false);
    const [width, setWidth] = useState(SIZES.getRightBoxWidth() + SIZES.leftBoxWidth);

    window.addEventListener("resize", handleScreenResize);

    function callSetQueryOk(isOk) {
        setQueryOk(isOk);
    }

    function handleScreenResize() {
        setWidth(window.innerWidth - 20);
    }

    return (
        <>
            <Box style={rightBoxStyle(width)} sx={{mt:10}}>
                <Box style={leftBoxStyle}>
                    <GetSqlTables />
                </Box>
                <Box flexGrow={1} style={{ margin: 0 }}>
                    <ConnectionInfo callSetQueryOk={callSetQueryOk} width={SIZES.getRightBoxWidth()} />
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    {queryOk && <QueryWindow />}
                </Box>
            </Box>
            <Footer/>
        </>
    );
}