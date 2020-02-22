import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

interface PageLayoutProps {
    name: string;
    children: JSX.Element[] | JSX.Element
}

function PageLayout(props: PageLayoutProps) {

    const {
        name,
        children
    } = props

    return (
        <>
            <Typography variant="h1" gutterBottom>
                {name}
            </Typography>
            <Divider />
            <Box p={2}>
                {children}
            </Box>
        </>
    );
}

export default PageLayout;