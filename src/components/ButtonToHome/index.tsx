import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

function ContentFooter() {
    return (
        <Link component={RouterLink} to="/" replace>
            &#8592;
        </Link>
    );
}

export default ContentFooter;
