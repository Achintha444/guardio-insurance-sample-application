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
import { meDetails } from '../util/apiDecode';
import AddUserComponent from '../components/settingsComponents/addUserComponent';
import IdentityProviders from "../components/settingsComponents/identity-providers/identity-providers";

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

    const SETTINGS_UI = "settings interface"

    const { data: session, status } = useSession();

    const [activeKeySideNav, setActiveKeySideNav] = useState('1');
    
    const signOutOnClick = () => signOut({ callbackUrl: "/" });

    const mainPanelComponenet = (activeKey, session) => {
        switch (activeKey) {
            case '1':
                return <HomeComponent session={session} />;
            case '2-1':
                return <ViewUserComponent session={session} />;
            case '2-2':
                return <AddUserComponent session={session} />;
            case '2-3':
                return <IdentityProviders session={session} />;

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
                        <LogoComponent />
                    </Sidenav.Header>
                    <Sidenav.Body>
                        <Nav activeKey={activeKeySideNav}>
                            <Nav.Item eventKey="1" icon={<DashboardIcon />} onSelect={(eventKey) => activeKeySideNavSelect(eventKey)}>
                                Dashboard
                            </Nav.Item>
                            <Nav.Menu eventKey="2" title="Settings" icon={<GearCircleIcon />}>
                                <Nav.Item eventKey="2-1" onSelect={(eventKey) => activeKeySideNavSelect(eventKey)}>View Users</Nav.Item>
                                <Nav.Item eventKey="2-2" onSelect={(eventKey) => activeKeySideNavSelect(eventKey)}>Add User</Nav.Item>
                                <Nav.Item eventKey="2-3" onSelect={(eventKey) => activeKeySideNavSelect(eventKey)}>Identity Providers</Nav.Item>
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