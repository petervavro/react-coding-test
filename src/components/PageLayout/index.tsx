import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import ButtonToHome from '../ButtonToHome';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface Buttons {
    home: boolean;
}

interface PageLayoutProps {
    title: string;
    buttons: Buttons;
    children: JSX.Element[] | JSX.Element;
}

/* Styles */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: theme.spacing(3),
        },
        paper: {
            padding: theme.spacing(3),
            width: '100%',
        },
        control: {
            padding: theme.spacing(3),
        },
    }),
);

function PageLayout(props: PageLayoutProps) {
    const { title, children, buttons } = props;

    const classes = useStyles();

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item>
                <Paper className={classes.paper}>
                    {title !== '' && (
                        <Typography variant="h1" gutterBottom>
                            {title}
                        </Typography>
                    )}
                    <Divider />
                    <Box p={2}>{children}</Box>
                    <Box>
                        <Box py={2}>
                            <Divider />
                        </Box>
                        <Box py={2}>{buttons.home === true && <ButtonToHome />}</Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
}

PageLayout.defaultProps = {
    title: '',
    buttons: {
        home: true,
    },
};

export default PageLayout;
