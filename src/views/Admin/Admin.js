import React from 'react';
import Hero from '../../components/Hero';
import Group from '../../components/Groups';
import AppCard from '../../components/AppCard';

function Admin() {
    return (
        <React.Fragment>
            <Hero />
            <Group isAdmin={true} />
            <AppCard isAdmin={true} />
        </React.Fragment>
    );
};

export default Admin;