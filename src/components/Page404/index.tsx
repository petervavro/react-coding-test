import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

function PageNoPage() {
    return (
        <Fragment>
            <Typography variant="h1" gutterBottom>
                404
            </Typography>
            <Link component={RouterLink} to="/">
                Go to home
            </Link>
        </Fragment>
    );
}

export default PageNoPage;
