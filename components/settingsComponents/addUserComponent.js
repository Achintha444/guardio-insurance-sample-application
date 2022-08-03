import React, { useLayoutEffect, useState } from 'react';
import { Form, Input, ButtonToolbar, Button, Loader } from 'rsuite';

import styles from '../../styles/Settings.module.css';
import stylesSignin from '../../styles/Signin.module.css';
import "rsuite/dist/rsuite.min.css";
import { consoleLogDebug, stringIsEmpty } from '../../util/util';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);


export default function AddUserComponent(props) {

    const ADD_USER_COMPONENT = "ADD USER COMPONENT";

    const LOADING_DISPLAY_NONE = "none";
    const LOADING_DISPLAY_BLOCK = "block";

    const [nameField, setNameField] = useState("");
    const [emailField, setemailField] = useState("");
    const [usernameField, setUsernameField] = useState("");
    const [passwordField, setPasswordField] = useState("");
    const [repasswordField, setRePasswordField] = useState("");

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [repasswordError, setRePasswordError] = useState(false);

    const [loadingDisplay, setLoadingDisplay] = useState(LOADING_DISPLAY_NONE);

    const onFormvValueChange = (setField, event) => {
        setField(event);
    }

    const checkFieldError = (field, setField) => {
        if (stringIsEmpty(field)) {
            setField(true);
        } else {
            setField(false);
        }
    }

    const checkFormError = () => {

        checkFieldError(nameField, setNameError);
        checkFieldError(emailField, setEmailError);
        checkFieldError(usernameField, setUsernameError);
        checkFieldError(passwordField, setPasswordError);
        checkFieldError(repasswordField, setRePasswordError);

        return (nameError || emailError || usernameError
            || passwordError || repasswordError);

    }

    const onSubmit = () => {
        if (!checkFormError()) {
            
        }
    }

    return (
        <div className={styles.addUserMainDiv}>
            
            <h2>Add User to Guardio Life Insurance</h2>
            <div className={styles.addUserFormDiv}>
               
                <Form layout="vertical" className={styles.addUserForm} fluid>
                    <Form.Group controlId="name-6">
                        <Form.ControlLabel>Name</Form.ControlLabel>
                        <Form.Control
                            name="name"
                            value={nameField}
                            onChange={event => onFormvValueChange(setNameField, event)}
                        />
                        <Form.ErrorMessage show={nameError} >
                            Name field cannot be empty
                        </Form.ErrorMessage>
                    </Form.Group>
                    <Form.Group controlId="email-6">
                        <Form.ControlLabel>Email</Form.ControlLabel>
                        <Form.Control name="email" type="email"
                            value={emailField}
                            onChange={event => onFormvValueChange(setemailField, event)} />
                        <Form.ErrorMessage show={emailError} >
                            Email field cannot be empty
                        </Form.ErrorMessage>
                    </Form.Group>

                    <hr />

                    <Form.Group controlId="password-6">
                        <Form.ControlLabel>Username</Form.ControlLabel>
                        <Form.Control name="username"
                            value={usernameField}
                            onChange={event => onFormvValueChange(setUsernameField, event)} />
                        <Form.ErrorMessage show={usernameError} >
                            Username field cannot be empty
                        </Form.ErrorMessage>
                    </Form.Group>
                    <Form.Group controlId="password-6">
                        <Form.ControlLabel>Password</Form.ControlLabel>
                        <Form.Control name="password" type="password" autoComplete="off"
                            value={passwordField}
                            onChange={event => onFormvValueChange(setPasswordField, event)} />
                        <Form.ErrorMessage show={passwordError} >
                            Password field cannot be empty
                        </Form.ErrorMessage>
                    </Form.Group>
                    <Form.Group controlId="password-6">
                        <Form.ControlLabel>Re Enter Password</Form.ControlLabel>
                        <Form.Control name="password" type="password" autoComplete="off"
                            value={repasswordField}
                            onChange={event => onFormvValueChange(setRePasswordField, event)} />
                        <Form.ErrorMessage show={repasswordError} >
                            Re Enter Password field cannot be empty
                        </Form.ErrorMessage>
                    </Form.Group>

                    <Form.Group>
                        <ButtonToolbar>
                            <Button className={styles.addUserButton} size="lg" appearance="primary"
                                onClick={onSubmit}>Submit</Button>
                        </ButtonToolbar>
                    </Form.Group>
                </Form>
            </div>
            <div style={{
                display: {loadingDisplay}
            }}>
                <Loader  size="lg" backdrop content="User is adding" vertical />
            </div>
            

        </div>

    )
}
