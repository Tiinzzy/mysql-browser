import React from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Box style={{borderTop: 'solid 2px #2180A4', textAlign:'center', color:'gray', paddingTop:10, margin: '20px 50px 5px 50px', fontSize:'10px'}}>
                <Typography variant="caption">
                    Designed by Tina Vatanabadi, Copyright 2022
                </Typography>
            </Box>
        );
    }
}
export default Footer;