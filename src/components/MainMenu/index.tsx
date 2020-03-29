import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps
} from 'react-router-dom';
import { Omit } from '@material-ui/types';

interface ListItemLinkProps {
    to: string;
    primary: string;
    secondary: string;
}

function ListItemLink(props: ListItemLinkProps) {

    const { 
        to, 
        primary, 
        secondary 
    } = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
                <RouterLink to={to} ref={ref} {...itemProps} />
            )),
        [to],
    );

    return (
        <ListItem button component={renderLink}>
            <ListItemText primary={primary} secondary={secondary} />
        </ListItem>
    );
}

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

function MainMenu() {
    const classes = useStyles();

    return (
        <Paper elevation={0} className={classes.root}>
            <List component="nav" aria-label="main">
                <ListItemLink to="/peter-vavro/focusable-input" primary="Input Components" secondary={"Task 1"} />
                <ListItemLink to="/peter-vavro/voting-list/10" primary="Task 2 : Voting List (with 10 candidates)" secondary={"Task 2"}/>
                <ListItemLink to="/peter-vavro/register-form" primary="Task 3 : Register Form" secondary={"Task 3"}/>
            </List>
        </Paper>
    );
}

export default MainMenu;