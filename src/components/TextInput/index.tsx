import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextInput = React.forwardRef((props, ref) => (
    <TextField
        label="Text Input"
        variant="outlined"
        inputRef={ref}
    />
));

export default TextInput