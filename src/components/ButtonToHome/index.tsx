import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function ContentFooter() {
    return (
        <Button variant="outlined" component={RouterLink} to="/" replace>
            &#8592; Home
        </Button>
    );
}

export default ContentFooter;
