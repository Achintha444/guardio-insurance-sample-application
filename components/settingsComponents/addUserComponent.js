import React, { useState } from 'react';
import { Form, Field, FORM_ERROR } from 'react-final-form'
import { Button, ButtonToolbar, Loader } from 'rsuite';
import FormSuite from 'rsuite/Form';
import { addUserEncode } from '../../util/apiDecode';

import styles from '../../styles/Settings.module.css';
import SuccessDialog from '../util/successDialog';

export default function AddUserComponent(props) {

    const ADD_USER_COMPONENT = "ADD USER COMPONENT";

    const LOADING_DISPLAY_NONE = {
        display: "none"
    };
    const LOADING_DISPLAY_BLOCK = {
        display: "block"
    };

    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    const [loadingDisplay, setLoadingDisplay] = useState(LOADING_DISPLAY_NONE);


    const nameValidate = (name, errors) => {
        if (!name) {
            errors.name = 'This field cannot be empty'
        }
        return errors;
    }

    const emailValidate = (email, errors) => {
        if (!email) {
            errors.email = 'This field cannot be empty'
        }
        return errors;
    }

    const usernameValidate = (username, errors) => {
        if (!username) {
            errors.username = 'This field cannot be empty'
        }
        return errors;
    }

    const passwordValidate = (password, errors) => {
        if (!password) {
            errors.password = 'This field cannot be empty'
        }
        return errors;
    }

    const repasswordValidate = (repassword, errors) => {
        if (!repassword) {
            errors.repassword = 'This field cannot be empty'
        }
        return errors;
    }

    const validate = values => {
        const errors = {}
        errors = nameValidate(values.name, errors);
        errors = emailValidate(values.email, errors);
        errors = usernameValidate(values.username, errors)
        errors = passwordValidate(values.password, errors);
        errors = repasswordValidate(values.repassword, errors);

        return errors
    }

    const onDataSubmit = (response) => {
        if (response) {
            setSuccessDialogOpen(true);
        } else {

        }
    }

    const onSubmit = async (values ,form)=> {
        setLoadingDisplay(LOADING_DISPLAY_BLOCK);
        window.alert(JSON.stringify(values, 0, 2));
        addUserEncode(props.session, values.name, values.email,
            values.username, values.password)
            .then((response) => onDataSubmit(response))
            .finally((response) => setLoadingDisplay(LOADING_DISPLAY_NONE))
        form.restart();
    }

    const closeSuccessDialog = () => {
        setSuccessDialogOpen(false);
    }

    return (
        <div className={styles.addUserMainDiv}>
            <SuccessDialog open={successDialogOpen} onClose={closeSuccessDialog} />

            <h2>Add User</h2>
            <div className={styles.addUserFormDiv}>
                <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <FormSuite ayout="vertical" className={styles.addUserForm}
                            onSubmit={handleSubmit} fluid>
                            <Field
                                name="name"
                                render={({ input, meta }) => (
                                    <FormSuite.Group controlId="name-6">
                                        <FormSuite.ControlLabel>Name</FormSuite.ControlLabel>
                                        <FormSuite.Control
                                            {...input}
                                        />
                                        {meta.error && meta.touched && <FormSuite.ErrorMessage show={true}  >
                                            {meta.error}
                                        </FormSuite.ErrorMessage>}
                                    </FormSuite.Group>
                                )}
                            />

                            <Field
                                name="email"
                                render={({ input, meta }) => (
                                    <FormSuite.Group controlId="name-6">
                                        <FormSuite.ControlLabel>Email</FormSuite.ControlLabel>
                                        <FormSuite.Control
                                            {...input}
                                            type='email'
                                        />
                                        {meta.error && meta.touched && <FormSuite.ErrorMessage show={true}  >
                                            {meta.error}
                                        </FormSuite.ErrorMessage>}
                                    </FormSuite.Group>
                                )}
                            />

                            <hr />

                            <Field
                                name="username"
                                render={({ input, meta }) => (
                                    <FormSuite.Group controlId="name-6">
                                        <FormSuite.ControlLabel>Username</FormSuite.ControlLabel>
                                        <FormSuite.Control
                                            {...input}
                                        />
                                        {meta.error && meta.touched && <FormSuite.ErrorMessage show={true} >
                                            {meta.error}
                                        </FormSuite.ErrorMessage>}
                                    </FormSuite.Group>
                                )}
                            />

                            <Field
                                name="password"
                                render={({ input, meta }) => (
                                    <FormSuite.Group controlId="name-6">
                                        <FormSuite.ControlLabel>Password</FormSuite.ControlLabel>
                                        <FormSuite.Control
                                            {...input}
                                            type='password'
                                            autoComplete='off'
                                        />
                                        {meta.error && meta.touched && <FormSuite.ErrorMessage show={true}  >
                                            {meta.error}
                                        </FormSuite.ErrorMessage>}
                                    </FormSuite.Group>
                                )}
                            />

                            <Field
                                name="repassword"
                                render={({ input, meta }) => (
                                    <FormSuite.Group controlId="name-6">
                                        <FormSuite.ControlLabel>Re enter password</FormSuite.ControlLabel>
                                        <FormSuite.Control
                                            {...input}
                                            type='password'
                                            autoComplete='off'
                                        />
                                        {meta.error && meta.touched && <FormSuite.ErrorMessage show={true}  >
                                            {meta.error}
                                        </FormSuite.ErrorMessage>}
                                    </FormSuite.Group>
                                )}
                            />

                            <div className="buttons">
                                <FormSuite.Group>
                                    <ButtonToolbar>
                                        <Button className={styles.addUserButton} size="lg" appearance="primary"
                                            type='submit' disabled={submitting || pristine}>Submit</Button>
                                    </ButtonToolbar>
                                </FormSuite.Group>

                            </div>

                            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                        </FormSuite>
                    )}
                />
            </div>

            <div style={loadingDisplay}>
                <Loader size="lg" backdrop content="User is adding" vertical />
            </div>
        </div>
    )
}
