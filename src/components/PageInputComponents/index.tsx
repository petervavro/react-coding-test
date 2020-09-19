import React from 'react';
import FocusableTextInput from '../FocusableTextInput';
import PageLayout from '../PageLayout';

function InputComponents() {
    return (
        <PageLayout title={'Input components'} >
            <FocusableTextInput focused={true} />
        </PageLayout>
    );
}

export default InputComponents;
