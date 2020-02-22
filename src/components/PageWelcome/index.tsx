import React from 'react';
import PageLayout from '../../components/PageLayout';
import ContentFooter from '../../components/ContentFooter';

function PageWelcome() {

    return (
        <PageLayout
            name={'Welcome'}
        >
            <p>Finally, right?</p>
            <ContentFooter />
        </PageLayout>
    );
}

export default PageWelcome;