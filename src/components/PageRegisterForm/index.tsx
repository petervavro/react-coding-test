import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PageLayout from '../../components/PageLayout';

import { useForm } from "react-hook-form";

import {
    useHistory,
} from "react-router-dom";
import NumberFormat from 'react-number-format';

import * as yup from "yup";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        alert: {
            marginBottom: theme.spacing(2),
        },
    }),
);

type FormData = {
    username: string;
    email: string;
    phone_number: string;
};

// Validation Schema
// https://github.com/jquense/yup
const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(4, "Must have at least 4 characters.")
        .max(20, "Must have 20 characters max.")
        .matches(/^[A-Za-z0-9]+$/, "Only alphanumeric characters allowed.")
        .required("Field is required."),
    email: yup
        .string()
        .email('Wrong email format.')
        .required("Field is required."), // .matches(/^[A-Za-z0-9]+$/, "Only alphanumeric characters allowed.")
    phone_number: yup
        .string()
        .matches(/^[(]{1}[0-9]{3}[)]{1}\s\d{3}\s\d{4}$/, "The number is incomplete.")
        .test(
            'test-first-range', 
            "It must start with a number between 300 and 320 (included).", 
            (value) => {

                if (value !== "") {

                    // Convert to numbers
                    const numbersOnly = value.match(/\d+/g).join([])

                    // Check if the first 3 numbers are in range 300 to 320
                    if (numbersOnly.length >= 3) {

                        const startNumber = parseInt(numbersOnly.substring(0, 3), 10)

                        return (startNumber >= 300 && startNumber <= 320)

                    }

                }

                return false
        })
       .required("Field is required.")
});

// Define default data
const defaultValues: FormData = {
    username: "",
    email: "",
    phone_number: "",
};

function PageRegisterForm() {

    const classes = useStyles();

    // State : "errorMessage"
    const [errorMessage, setErrorMessage] = useState();

    let history = useHistory();

    const methods = useForm<FormData>({
        validationSchema: validationSchema,
        defaultValues: defaultValues
    });

    const { 
        register, 
        handleSubmit, 
        errors, 
        setValue 
    } = methods;

    const onSubmit = handleSubmit((values: FormData) => {

        const {
            username,
            email,
            phone_number
        } = values;

        // Prepare from data
        let formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('phone_number', phone_number);

        fetch('http://sgaviria.com/api/1/front-dev/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Tranqui-FrontendDeveloper': 'Peter Vavro',
            },
            body: formData
        })
        .then(response => {

            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong ...');
            }

        })
        .then(data => {

            if (typeof data.error !== 'undefined' && data.error !== undefined) {

                // Set received error
                setErrorMessage(data.error)

            } else {

                // Redirect to welcome page
                history.push("/peter-vavro/welcome")

            }

        })
        .catch(error => {

            setErrorMessage('We are having some troubles with our service right now, please try again later.')

        });

    });

    // Extract errors
    const {
        username,
        email,
        phone_number,
    } = errors

    return (
        <PageLayout
            title={'Register Form'}
        >
            {(errorMessage) && (
                <Alert 
                    severity="error"
                    className={classes.alert}
                >
                    {errorMessage}
                </Alert>
            )}
            <form onSubmit={onSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            id="username"
                            label="Username"
                            name="username"
                            inputRef={register}
                            onChange={e => setValue("username", e.target.value.toLowerCase())}
                            error={(username !== undefined)}
                            helperText={username && errors['username']?.message}
                        />  
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            label="Email"
                            name="email"
                            inputRef={register}
                            error={(email !== undefined)}
                            helperText={email && errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <NumberFormat 
                            id="phone_number"
                            label="Phone number"
                            name="phone_number"
                            inputRef={register}
                            error={(phone_number !== undefined)}
                            helperText={phone_number && errors.phone_number?.message}
                            customInput={TextField} 
                            format="(###) ### ####"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </PageLayout>
    );
}

export default PageRegisterForm;