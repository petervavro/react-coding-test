import React from 'react';
import FocusableTextInput from '../../components/FocusableTextInput';
import PageLayout from '../../components/PageLayout';

function InputComponents() {
    return (
        <PageLayout
            title={'Input components'}
            buttons={{
                home: true,
            }}
        >
            <FocusableTextInput focused={true} />
        </PageLayout>
    );
}

export default InputComponents;
