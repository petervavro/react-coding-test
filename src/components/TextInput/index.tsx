import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

const TextInput = React.forwardRef<React.Component, TextFieldProps>(function renderTextInput(props, ref) {
    return <TextField label="Text Input" variant="outlined" inputRef={ref} />;
});

export default TextInput;
