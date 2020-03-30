import React, { useEffect, useRef, ElementType } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const TextInput = React.forwardRef<React.Component, TextFieldProps>(function renderTextInput(props, ref) {
    return <TextField label="Text Input" variant="outlined" inputRef={ref} />;
});

type FocusableTextInput = {
    defaultFocused?: boolean;
};

/**
 * Get the previous props
 * https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 * TS : https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect
 * @param value
 */
const usePrevious = <T extends {}>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

function FocusableTextInput({ defaultFocused = false }: FocusableTextInput) {
    const inputEl = useRef() as React.MutableRefObject<React.ComponentPropsWithRef<ElementType>>;

    // Get previous
    const prevFocused = usePrevious(defaultFocused);

    // Set focus on text input
    const handleFocus = () => {
        if (inputEl.current) {
            inputEl.current.focus();
        }
    };

    useEffect(() => {
        // Apply focus
        if (prevFocused !== true && defaultFocused === true) {
            if (inputEl instanceof Object && inputEl.current !== undefined) handleFocus();
        }
    });

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextInput ref={inputEl} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button variant="contained" color="primary" onClick={handleFocus}>
                    Set focus on text input
                </Button>
            </Grid>
        </Grid>
    );
}

export default FocusableTextInput;
