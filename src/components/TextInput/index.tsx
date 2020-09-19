import React from 'react';
import TextField from '@material-ui/core/TextField';

type Props = {}

export type Ref = HTMLInputElement

export default React.forwardRef<Ref, Props>(function TextInput(props, ref) {
    return <TextField {...props} label="Text Input" variant="outlined" inputRef={ref} />;
});
