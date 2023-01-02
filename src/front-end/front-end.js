import * as React from 'react';
import Divider from '@mui/material/Divider';

import ConnectionInfo from './ConnectionInfo';

export function renderMainPage() {
    return (
        <div style={{ margin: 10 }}>
            <ConnectionInfo />

            <Divider sx={{ mt: 2, mb: 2 }} />
        </div>
    );
}