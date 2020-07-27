import React from 'react';
import Paper from '@material-ui/core/Paper'
import { HeaderUser } from '../Header'

function HeroUser(props){
    return(
        <>
            <Paper elevation={0}>
                <HeaderUser />
            </Paper>
        </>
    )
}

export default HeroUser