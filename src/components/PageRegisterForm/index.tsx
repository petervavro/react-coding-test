/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import PageLayout from '../PageLayout';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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

// Validation Schema
const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(4, 'Must have at least 4 characters.')
        .max(20, 'Must have maximum 20 characters.')
        .matches(/^[A-Za-z0-9]+$/, 'Only alphanumeric characters allowed.')
        .required('Field is required.'),
    email: yup
        .string()
        .email('Wrong email format.')
        .required('Field is required.'),
    phone_number: yup
        .string()
        .matches(/^[(]{1}[0-9]{3}[)]{1}\s\d{3}\s\d{4}$/, 'The number is incomplete.')
        .test(
            'test-first-range', 
            'It must start with a number between 300 and 320 (included).', 
            (value) => {

                if (!!value) {

                    const numbersParts = value.match(/\d+/g);

                    if (
                        Array.isArray(numbersParts)
                        && numbersParts.length
                    ) {
                        const startNumber = parseInt(numbersParts[0], 10);

                        return (startNumber >= 300 && startNumber <= 320);
                    }
                }

                return false;
            }
        )
        .required('Field is required.'),
});

// Define default data
const defaultValues: IFormInput = {
    username: '',
    email: '',
    phone_number: '',
};

function PageRegisterForm() {
    const classes = useStyles();

    // State : "errorMessage"
    const [errorMessage, setErrorMessage] = useState<string>('');

    const history = useHistory();

    const { register, handleSubmit, errors, setValue } = useForm<IFormInput>({
        mode: 'onTouched',
        defaultValues: defaultValues,
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = handleSubmit(
        async ({ username, email, phone_number }: IFormInput) => {

            try {

                // Prepare from data
                const formData = new URLSearchParams();
                formData.append('username', username);
                formData.append('email', email);
                formData.append('phone_number', phone_number.replace(/\D/g,''));

                let response = await fetch(
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

                const { status, error } = await response.json()

                // Set received error
                if (!status && error) return setErrorMessage(error);

                // Redirect to welcome page
                if (status) return history.push('/peter-vavro/welcome');

                throw new Error();

            } catch (error) {

                // Set unknown error
                setErrorMessage('We are having some troubles with our service right now, please try again later.');
            }
            
        }
    );

    // Extract errors
    const { username, email, phone_number } = errors;

    return (
        <PageLayout title={'Register Form'}>
            <>
                {errorMessage !== '' && 
                    <Alert severity="error" className={classes.alert}>
                        {errorMessage}
                    </Alert>
                }
                <form onSubmit={onSubmit}>
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
                                inputRef={register}
                                error={phone_number !== undefined}
                                helperText={phone_number && errors.phone_number?.message}
                                customInput={TextField}
                                format="(###) ### ####"
                                type='tel'
                                mask="_"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </>
        </PageLayout>
    );
}

export default PageRegisterForm;
