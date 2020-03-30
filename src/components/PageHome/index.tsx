import React from 'react';
import PageLayout from '../../components/PageLayout';
import MainMenu from '../../components/MainMenu';

function PageHome() {
    return (
        <PageLayout
            title={'Peter Vavro'}
            buttons={{
                home: false,
            }}
        >
            <MainMenu />
        </PageLayout>
    );
}

export default PageHome;
