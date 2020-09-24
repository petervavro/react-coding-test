import React from 'react';
import PageLayout from 'components/PageLayout';
import Typography from '@material-ui/core/Typography';

function PageWelcome() {
    return (
        <PageLayout title={'Welcome in'}>
            <Typography variant="body1" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur.
            </Typography>
        </PageLayout>
    );
}

export default PageWelcome;
