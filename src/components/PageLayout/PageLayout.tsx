import React from 'react';
import PropTypes from "prop-types";
import ButtonToHome from 'components/ButtonToHome';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type PageLayoutProps = {
    title: string;
    buttons: React.ReactNode;
    children: React.ReactNode;
};

/* Styles */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(3),
            width: '100%',
        },
        control: {
            padding: theme.spacing(3),
        },
    }),
);

function PageLayout({ 
    title, 
    children, 
    buttons 
}: PageLayoutProps) {

    const classes = useStyles();

    return (
        <Container maxWidth="md">
            <Paper className={classes.paper}>
                {title && (
                    <Typography variant="h1" gutterBottom data-testid="pageTitle" >
                        {title}
                    </Typography>
                )}
                <Divider />
                <Box py={2}>
                    {children}
                </Box>                
                <Divider />
                <Box py={2}>
                    {buttons}
                </Box>  
            </Paper>
        </Container>
    );
}
PageLayout.defaultProps = {
    buttons: <ButtonToHome />
}

PageLayout.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    buttons: PropTypes.node,
};

export default PageLayout;
