import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

function MainMenu() {
    return (
        <List component="nav" aria-label="main">
            <ListItem button component={RouterLink} to="/peter-vavro/focusable-input">
                <ListItemText primary="Input Components" secondary={'Task 1'} />
            </ListItem>
            <ListItem button component={RouterLink} to="/peter-vavro/voting-list/10">
                <ListItemText primary="Voting List (with 10 candidates)" secondary={'Task 2'} />
            </ListItem>
            <ListItem button component={RouterLink} to="/peter-vavro/register-form">
                <ListItemText primary="Register Form" secondary={'Task 3'} />
            </ListItem>
        </List>
    );
}

export default MainMenu;
