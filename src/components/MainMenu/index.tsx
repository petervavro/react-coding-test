import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const routePrefix = '/peter-vavro';

function MainMenu() {
    return (
        <List component="nav" aria-label="main">
            <ListItem button component={RouterLink} to={`${routePrefix}/focusable-input`}>
                <ListItemText primary="Input Components" secondary={'Task 1'} />
            </ListItem>
            <Divider component="li" />
            <ListItem button component={RouterLink} to={`${routePrefix}/voting-list/10`}>
                <ListItemText primary="Voting List (with 10 candidates)" secondary={'Task 2'} />
            </ListItem>
            <Divider component="li" />
            <ListItem button component={RouterLink} to={`${routePrefix}/register-form`}>
                <ListItemText primary="Register Form" secondary={'Task 3'} />
            </ListItem>
        </List>
    );
}

export default MainMenu;
