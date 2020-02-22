import React from 'react';
import FocusableTextInput from '../../components/FocusableTextInput';
import PageLayout from '../../components/PageLayout';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

function InputComponents() {

    return (
        <PageLayout
            name={'Input components'}
        >
            <FocusableTextInput focused={true} />
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
        </PageLayout>
    );
}

export default InputComponents;