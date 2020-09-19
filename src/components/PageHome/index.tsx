import React from 'react';
import PageLayout from '../PageLayout';
import MainMenu from '../MainMenu';

function PageHome() {
    return (
        <PageLayout title={'Peter Vavro'} buttons={null}>
            <MainMenu />
        </PageLayout>
    );
}

export default PageHome;
