import React from 'react';
import Hero from '../../components/Hero';
// import Group from '../../components/Groups';
import AppCard from '../../components/AppCard';
import Paper from '@material-ui/core/Paper'

/**
 * @Component Client
 * @Description This component is the client's view.
 */

function Client() {
    return (
        <React.Fragment>
            <Paper>
                <Hero />
                {/* <Group /> */}
                <AppCard />
            </Paper>
        </React.Fragment>
    );
};

export default Client;