import React from 'react';
import Hero from '../../components/Hero';
// import Group from '../../components/Groups';
import AppCard from '../../components/AppCard';
import Paper from '@material-ui/core/Paper'

function Admin() {
    return (
        <React.Fragment>
            <Paper>
                <Hero />
                {/* <Group isAdmin={true} /> */}
                <AppCard isAdmin={true} />
            </Paper>
        </React.Fragment>
    );
};

export default Admin;