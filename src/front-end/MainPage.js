import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import ConnectionInfo from './ConnectionInfo';
import QueryWindow from './QueryWindow';
import GetSqlTables from './GetSqlTables';

export default function MainPage() {
    const [queryOk, setQueryOk] = useState(false);

    function callSetQueryOk(isOk) {
        setQueryOk(isOk);
    }

    return (
        <Box style={{ display: 'flex', flexDirection: 'row', marginTop: 10, marginLeft: 10, marginRight: 10 }}>
            <Box style={{ overflowY: 'scroll', border: 'solid 1px #eaeaea', borderRadius: 3, display: 'flex', flexDirection: 'column', marginTop: 28, height: '385px' }}>
                <GetSqlTables />
            </Box>
            <div style={{ margin: 10 }}>
                <ConnectionInfo callSetQueryOk={callSetQueryOk} />

                <Divider sx={{ mt: 2, mb: 2 }} />

                {queryOk && <QueryWindow />}
            </div>
        </Box>

    );
}