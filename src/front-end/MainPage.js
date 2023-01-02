import * as React from 'react';
import { useState } from 'react';
import Divider from '@mui/material/Divider';

import ConnectionInfo from './ConnectionInfo';
import QueryWindow from './QueryWindow';

export default function MainPage() {
    const [queryOk, setQueryOk] = useState(false);

    function callSetQueryOk(isOk) {
        setQueryOk(isOk);
    }

    return (
        <div style={{ margin: 10 }}>
            <ConnectionInfo callSetQueryOk={callSetQueryOk} />

            <Divider sx={{ mt: 2, mb: 2 }} />

            {queryOk && <QueryWindow />}
        </div>
    );
}