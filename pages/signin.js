import React, { Component } from 'react';
import styles from '../styles/Signin.module.css';
import { Button, Dropdown } from 'rsuite';

import "rsuite/dist/rsuite.min.css";

export default class signin extends Component {
  render() {
    return (
      <div className={styles.signinOuter}>
        <div className={styles.signinInner}>
          <h1><span>Guardio</span> Insurance</h1>
          <p className={styles.signinText}>Sign in</p>
          <p className={styles.signinTag}>Select your organization to proceed</p>

          <Dropdown className={styles.signinDropdown} title="Organization" trigger={['click', 'hover']} onSelect={() =>{
            console.log("check")
          }}
        
          >
            <Dropdown.Item className={styles.signinDropdownItem}>Guardio Life Insurance</Dropdown.Item>
            <Dropdown.Item className={styles.signinDropdownItem}>Guardio Vehicle Insurance</Dropdown.Item>
          </Dropdown>

          <div className={styles.buttonCarousell}>
            <Button className={styles.nextButton} size="lg" appearance='primary'>Next</Button>
            <Button size="lg" appearance="link">Register</Button>
          </div>
        </div>
      </div>
    )
  }
}
