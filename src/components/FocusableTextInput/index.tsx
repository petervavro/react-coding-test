import React, { useEffect, useRef, ElementType } from 'react';
// import TextInput from '../../components/TextInput';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

const TextInput = React.forwardRef<React.Component, TextFieldProps>(function renderTextInput(props, ref) {
    return <TextField label="Text Input" variant="outlined" inputRef={ref} />;
});

type FocusableTextInput = {
    focused?: boolean;
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

function FocusableTextInput({ focused = false }: FocusableTextInput) {
    const inputEl = useRef() as React.MutableRefObject<React.ComponentPropsWithRef<ElementType>>;

    // Get previous
    const prevFocused = usePrevious(focused);

    const handleFocus = () => {
        if (inputEl.current) {
            inputEl.current.focus();
        }
    };

    useEffect(() => {
        // Apply focus
        if (prevFocused !== true && focused === true) {
            if (inputEl instanceof Object && inputEl.current !== undefined) handleFocus();
        }
    });

    return <TextInput ref={inputEl} />;
}

export default FocusableTextInput;
