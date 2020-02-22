import React from 'react';

import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

function ContentFooter() {

    return (
        <>
            <Box py={2}>
                <Divider />
            </Box>
            <Box py={2}>
                <Link
                    component={RouterLink}
                    to={`/`}
                    replace
                >
                    Home
                </Link>
            </Box>
        </>
    );
}

export default ContentFooter;