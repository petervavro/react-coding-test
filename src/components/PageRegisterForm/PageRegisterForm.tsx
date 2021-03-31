import React, { memo, useCallback, useState } from 'react';

import PageLayout from 'components/PageLayout';

import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import NumberFormat from 'react-number-format';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useHistory } from 'react-router-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const ERROR_MESSAGES = {
    submitError: () => 'We are having some troubles with our service right now, please try again later.',
    required: () => 'This field is required.',
    pattern: () => 'Incorrect format.',
    minlength: (num: number) => `Min chars required is ${num}.`,
    maxlength: (num: number) => `Max chars allowed is ${num}.`,
    onlyAlphanumericChars: () => `Only alphanumeric characters allowed.`,
    invalidEmail: () => 'Your email address seems to have invalid format. Please, enter valid email address.',
    phoneNumberRangeRestriction: () => `It must start with a number between 300 and 320 (included), and it should have format e.g. (300) 123 1234.`,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        alert: {
            marginBottom: theme.spacing(2),
        },
    }),
);
interface IFormInput {
    username: string;
    email: string;
    phone_number: string;
}

// Define default data
const defaultValues: IFormInput = {
    username: '',
    email: '',
    phone_number: '',
};

// Validation Schema
const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(4, ERROR_MESSAGES.minlength(4))
        .max(20, ERROR_MESSAGES.maxlength(20))
        .matches(
            /^[A-Za-z0-9]+$/, 
            ERROR_MESSAGES.onlyAlphanumericChars
        )
        .required(ERROR_MESSAGES.required()),
    email: yup
        .string()
        .email(ERROR_MESSAGES.invalidEmail())
        .required(ERROR_MESSAGES.required()),
    phone_number: yup
        .string()
        .matches(
            /^(30[0-9]|31[0-9]|320)\d{7}$/, 
            ERROR_MESSAGES.phoneNumberRangeRestriction()
        )
        .required(ERROR_MESSAGES.required()),
});

const PageRegisterForm = () => {

    const classes = useStyles();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { 
        register, 
        handleSubmit, 
        errors, 
        setValue
    } = useForm<IFormInput>({
        mode: 'onTouched',
        defaultValues: defaultValues,
        resolver: yupResolver(validationSchema)
    });

    // Extract errors
    const { username, email, phone_number } = errors;

    // Handle request
    const handleRequest = useCallback(
        async ({ 
            username, 
            email, 
            phone_number 
        }: IFormInput) => {
    
            try {
    
                // Prepare from data
                const formData = new URLSearchParams();
                formData.append('username', username);
                formData.append('email', email);
                formData.append('phone_number', phone_number.replace(/\D/g,''));
    
                const response = await fetch(
                    '/api',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Developer': 'Peter Vavro',
                        },
                        body: formData,
                    }
                )
    
                const { status, message } = await response.json()
    
                // Set received error
                if (!status && message) return setErrorMessage(message);
    
                // Redirect to welcome page
                if (status) return history.push('/peter-vavro/welcome');
    
                throw new Error();
    
            } catch (error) {
    
                // Set unknown error
                setErrorMessage(ERROR_MESSAGES.submitError());
            }
            
        },
        [history],
    );

    return (
        <PageLayout title={'Registration form'}>
            {errorMessage !== '' && 
                <Alert severity="error" className={classes.alert}>
                    {errorMessage}
                </Alert>
            }
            <form onSubmit={handleSubmit(handleRequest)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            id="username"
                            label="Username"
                            name="username"
                            inputRef={register}
                            autoFocus
                            onChange={(e) => setValue('username', e.target.value.toLowerCase())}
                            error={username !== undefined}
                            helperText={username && errors['username']?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            label="Email"
                            name="email"
                            inputRef={register}
                            error={email !== undefined}
                            helperText={email && errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <NumberFormat
                            id="phone_number"
                            label="Phone number"
                            name="phone_number"
                            inputRef={register({
                                setValueAs: (value) => parseInt( value.replace(/\D/g, ''), 10),
                              })}
                            error={phone_number !== undefined}
                            helperText={phone_number && errors.phone_number?.message}
                            customInput={TextField}
                            format="(###) ### ####"
                            mask="_"
                            isNumericString={true}
                            allowNegative={false}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </PageLayout>
    );
};

export default memo(PageRegisterForm);