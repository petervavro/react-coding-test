import React from 'react';
import FocusableTextInput from '../../components/FocusableTextInput';
import PageLayout from '../../components/PageLayout';
import ContentFooter from '../../components/ContentFooter';

function InputComponents() {

    return (
        <PageLayout
            name={'Input components'}
        >
            <FocusableTextInput focused={true} />
            <ContentFooter />
        </PageLayout>
    );
}

export default InputComponents;