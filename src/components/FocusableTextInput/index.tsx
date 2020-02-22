import React, { useEffect, useRef, MutableRefObject } from 'react';
import TextInput from '../../components/TextInput';

type FocusableTextInput = {
    focused?: boolean
}

/**
 * Get the previous props
 * https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 * @param value 
 */
function usePrevious(value: any) {

    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

function FocusableTextInput({ focused = false }: FocusableTextInput) {

    const inputEl = useRef() as MutableRefObject<HTMLInputElement>;

    // Get previous
    const prevFocused = usePrevious(focused);
    
    useEffect(() => {

        // Apply focus
        if (prevFocused !== true && focused === true) {
    
            if (inputEl instanceof Object && inputEl.current !== undefined) {

                inputEl.current.focus();
    
            }
    
        }

    });

    return (
        <TextInput 
            ref = { inputEl }
        />
    );
}

export default FocusableTextInput;