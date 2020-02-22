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
    primary: string;
    to: string;
}

function ListItemLink(props: ListItemLinkProps) {
    const { primary, to } = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
                <RouterLink to={to} ref={ref} {...itemProps} />
            )),
        [to],
    );

    return (
        <li>
            <ListItem button component={renderLink}>
                <ListItemText primary={primary} />
            </ListItem>
        </li>
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
            <List aria-label="main">
                <ListItemLink to="/peter-vavro/focusable-input" primary="Input Components" />
            </List>
        </Paper>
    );
}

export default MainMenu;