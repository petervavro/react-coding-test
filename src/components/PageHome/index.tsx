import React from 'react';
import Typography from '@material-ui/core/Typography';

import MainMenu from '../../components/MainMenu';

function PageHome() {

    return (
        <div>
            <Typography variant="h1" gutterBottom>
                Peter Vavro
            </Typography>
            <MainMenu />
        </div>
    );
}

export default PageHome;