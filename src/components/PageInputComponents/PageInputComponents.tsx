import React from 'react';
import FocusableTextInput from '../FocusableTextInput';
import PageLayout from '../PageLayout';

function PageInputComponents() {
    return (
        <PageLayout title={'Input components'} >
            <FocusableTextInput focused={true} />
        </PageLayout>
    );
}

export default PageInputComponents;
