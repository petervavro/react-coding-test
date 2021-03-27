import React, { useMemo } from 'react';
import TextField from '@material-ui/core/TextField';

type Props = Record<string, unknown>

export type Ref = HTMLInputElement

export default React.forwardRef<Ref, Props>(function TextInput(props, ref) {

    const inputProps = useMemo(() => ({ 'data-testid': "textInput" }), []);

    return <TextField {...props} label="Text Input" variant="outlined" inputRef={ref} inputProps={inputProps} />;
});
