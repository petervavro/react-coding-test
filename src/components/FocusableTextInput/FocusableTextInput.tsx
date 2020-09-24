import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import TextInput, { Ref } from '../TextInput';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

type FocusableTextInput = {
    focused?: boolean;
};

function FocusableTextInput({ focused = false } : FocusableTextInput) {

    const inputEl = useRef<Ref>(null!)

    /**
     * Set focus on text input
     */
    const handleFocus = useCallback(
        () => {
            if (inputEl instanceof Object && inputEl.current !== undefined) inputEl.current.focus();
        },
        [],
    );

    useEffect(() => {
        
        // Apply focus
        if (focused === true) handleFocus();

    }, [focused, handleFocus]);

    return (
        <Box display="flex" flexDirection="row">
            <Box p={1}>
                <TextInput ref={inputEl} />
            </Box>
            <Box p={1}>
                <Button variant="contained" color="primary" onClick={handleFocus} data-testid="button">
                    Set focus
                </Button>
            </Box>
        </Box>
    );
}

FocusableTextInput.propTypes = {
    focused: PropTypes.bool,
};

export default FocusableTextInput;
