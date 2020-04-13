import React from 'react';
import Hero from '../../components/Hero';
import Group from '../../components/Groups';
import AppCard from '../../components/AppCard';

function Admin() {
    return (
        <React.Fragment>
            <Hero />
            <Group />
            <AppCard admin={true}/>
        </React.Fragment>
    );
};

export default Admin;