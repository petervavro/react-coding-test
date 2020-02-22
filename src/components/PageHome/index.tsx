import React from 'react';
import PageLayout from '../../components/PageLayout';
import MainMenu from '../../components/MainMenu';

function PageHome() {

    return (
        <PageLayout
            name={'Peter Vavro'}
        >
            <MainMenu />
        </PageLayout>
    );
}

export default PageHome;