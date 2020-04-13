import React from 'react';
import Hero from '../../components/Hero';
import Group from '../../components/Groups';
import AppCard from '../../components/AppCard';

/**
 * @Component Client
 * @Description This component is the client's view.
 */

function Client() {
    return (
        <React.Fragment>
            <Hero />
            <Group />
            <AppCard />
        </React.Fragment>
    );
};

export default Client;