import React, { useState } from 'react';
import { Button, Panel, Placeholder } from 'rsuite';
import styles from '../styles/Settings.module.css';
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import config from '../config.json';


import "rsuite/dist/rsuite.min.css";
import Logo from '../components/logo/logo';
import { getSession, signOut, useSession } from 'next-auth/react';
import HomeComponent from '../components/settingsComponents/homeComponent';
import LogoComponent from '../components/settingsComponents/logoComponent';
import ViewUserComponent from '../components/settingsComponents/viewUserComponent';

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        }
    }

    console.log(session.user);

    return {
        props: {
            session: session,
        },
    }
}

export default function settings() {

    const { data: session, cookie, status } = useSession();

    const [activeKeySideNav, setActiveKeySideNav] = useState('1');

    const callAPI = async () => {
        console.log(session);
        const headers = {
            "accept": "application/scim+json",
            "authorization": "Bearer " + session.accessToken
        }
        try {
            const res = await fetch(
                `https://localhost:9443/o/${config.WSO2IS_LIFE_ORG_ID}/scim2/Me`,
                headers
            );
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    callAPI();
    const signOutOnClick = () => signOut({ callbackUrl: "/" });

    const mainPanelComponenet = (activeKey, session) => {
        switch (activeKey) {
            case '1':
                return HomeComponent(session);
            case '2-1':
                return ViewUserComponent(session);
            case '2-2':
                return HomeComponent(session);
            case '2-3':
                return HomeComponent(session);

        }
    }

    const activeKeySideNavSelect = (eventKey) => {
        setActiveKeySideNav(eventKey);
    }

    return (
        <div className={styles.mainDiv}>
            <div className={styles.sideNavDiv}>
                <Sidenav className={styles.sideNav} defaultOpenKeys={['3', '4']}>
                    <Sidenav.Header>
                        {LogoComponent()}
                    </Sidenav.Header>
                    <Sidenav.Body>
                        <Nav activeKey={activeKeySideNav}>
                            <Nav.Item eventKey="1" icon={<DashboardIcon />} onSelect={(eventKey) => activeKeySideNavSelect(eventKey)}>
                                Dashboard
                            </Nav.Item>
                            <Nav.Menu eventKey="2" title="Settings" icon={<GearCircleIcon />}>
                                <Nav.Item eventKey="2-1" onSelect={(eventKey) => activeKeySideNavSelect(eventKey)}>View Users</Nav.Item>
                                <Nav.Item eventKey="2-2" onSelect={(eventKey) => activeKeySideNavSelect(eventKey)}>Add User</Nav.Item>
                                <Nav.Item eventKey="2-3" onSelect={(eventKey) => activeKeySideNavSelect(eventKey)}>Add IDP</Nav.Item>
                            </Nav.Menu>
                        </Nav>
                    </Sidenav.Body>
                    <div className={styles.nextButtonDiv}>
                        <Button size="lg" appearance='ghost' onClick={signOutOnClick}>Sign Out</Button>
                    </div>


                </Sidenav>
            </div>
            <div className={styles.mainPanelDiv}>
                {mainPanelComponenet(activeKeySideNav, session)}
            </div>

        </div>
    )
}




