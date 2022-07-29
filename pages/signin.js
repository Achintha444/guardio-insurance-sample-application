import { getSession, signIn } from 'next-auth/react'
import React, { useState } from 'react';
import styles from '../styles/Signin.module.css';
import { Button, Dropdown } from 'rsuite';
import config from '../config.json';

import "rsuite/dist/rsuite.min.css";
import Logo from '../components/logo/logo';

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/temp',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}

export default function signin() {

  const [subOrgId, setSubOrgId] = useState(0);
  const [subOrgActive, setSubOrgActive] = useState(1);
  const [title, setTitle] = useState("Organization");

  let orgSelect = (event) => {
    setSubOrgId(event);
    (event==config.WSO2IS_LIFE_ORG_ID) ? setSubOrgActive([true,false]) : setSubOrgActive([false,true]);
    (event==config.WSO2IS_LIFE_ORG_ID) ? setTitle("Guardio Life Insurance") : setTitle("Guardio Vehicle Insurance");
  } 

  let nextOnClick = (event) => {
    signIn("wso2is",{ callbackUrl: "/temp"}, {orgId: subOrgId});
  }

  return (
    <div className={styles.signinOuter}>
      <div className={styles.signinInner}>
        <Logo fontSize={28} letterSpacing={-2} wordSpacing={-3} />
        <p className={styles.signinText}>Sign in</p>
        <p className={styles.signinTag}>Select your organization to proceed</p>

        <Dropdown activeKey={subOrgId} className={styles.signinDropdown} title={title} trigger={['click', 'hover']} 
          onSelect={(event)=>orgSelect(event)}>

          <Dropdown.Item active= {subOrgActive[0]} eventKey={config.WSO2IS_LIFE_ORG_ID} className={styles.signinDropdownItem} 
          onSelect={(event) => orgSelect(event)}>Guardio Life Insurance</Dropdown.Item>
          <Dropdown.Item active={subOrgActive[1]} eventKey={config.WSO2IS_VEH_ORG_ID} className={styles.signinDropdownItem} 
          onSelect={(event) => orgSelect(event)}>Guardio Vehicle Insurance</Dropdown.Item>

        </Dropdown>

        <div className={styles.buttonCarousell}>
          <Button className={styles.nextButton} size="lg" appearance='primary' onClick={(event)=>nextOnClick(event)}>Next</Button>
          <Button size="lg" appearance="link">Register</Button>
        </div>
      </div>
    </div>
  )
}


// export default class signin extends Component {

//   constructor() {
//     super();
//   }

  

//   render() {
  
//   }
// }
