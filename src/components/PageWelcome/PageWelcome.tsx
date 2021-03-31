import React from 'react';
import PageLayout from 'components/PageLayout';
import Typography from '@material-ui/core/Typography';

function PageWelcome() {
    return (
        <PageLayout title={'Welcome'}>
            <Typography variant="body1" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu dignissim mauris. Ut et quam turpis. Aliquam quis dignissim tellus. Nullam pharetra mi vitae hendrerit faucibus. Curabitur nisl magna, sagittis eu vehicula ac, vestibulum ut nisi. Cras porta ipsum vitae mattis egestas. Phasellus orci velit, facilisis ornare volutpat in, auctor eu lorem. Vivamus ac nulla in neque sollicitudin consectetur. Curabitur malesuada hendrerit odio, non volutpat enim sagittis non. Nunc vel enim odio. Phasellus ipsum libero, tristique at luctus sed, pharetra feugiat felis. Vestibulum gravida urna eget metus accumsan mollis. Etiam at velit nisi. Vestibulum id nibh imperdiet, pulvinar orci gravida, congue nulla. Proin nec risus id dolor ultrices sodales at dapibus sem.
            </Typography>
        </PageLayout>
    );
}

export default PageWelcome;
