import React from 'react';
import FocusableTextInput from 'components/FocusableTextInput';
import PageLayout from 'components/PageLayout';

function PageInputComponents() {
    return (
        <PageLayout title={'Input components'} >
            <FocusableTextInput focused={true} />
        </PageLayout>
    );
}

export default PageInputComponents;
