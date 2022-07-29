import React from 'react';
import { Button, Panel, Placeholder } from 'rsuite';
import styles from '../styles/Settings.module.css';
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import config from '../config.json';


import "rsuite/dist/rsuite.min.css";
import Logo from '../components/logo/logo';
import { getSession, signOut, useSession } from 'next-auth/react';

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

    const { data: session, status } = useSession();

    const callAPI = async () => {
        console.log(session);
        const headers = {
            "accept": "application/scim+json",
            "authorization": "Bearer " + session.idToken
        }
        try {
            const res = await fetch(
                `https://localhost:9443/t/${config.WSO2IS_LIFE_ORG_ID}/wso2/scim2/Me`,
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

    return (
        <div className={styles.mainDiv}>
            <div className={styles.sideNavDiv}>
                <Sidenav className={styles.sideNav} defaultOpenKeys={['3', '4']}>
                    <Sidenav.Header>
                        <div className={styles.logoDiv}>
                            <Logo fontSize={28} letterSpacing={-2} wordSpacing={`normal`} />
                            <p className={styles.nameTag}>A relationship for life </p>
                            <hr />
                            <h5 className={styles.nameTag}>Life Insurance </h5>
                            <hr />
                        </div>
                    </Sidenav.Header>
                    <Sidenav.Body>
                        <Nav activeKey="1">
                            <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                                Dashboard
                            </Nav.Item>
                            <Nav.Item eventKey="2" icon={<GearCircleIcon />}>
                                Settings
                            </Nav.Item>
                        </Nav>
                    </Sidenav.Body>
                    <div className={styles.nextButtonDiv}>
                        <Button size="lg" appearance='ghost' onClick={signOutOnClick}>Sign Out</Button>
                    </div>


                </Sidenav>
            </div>
            <div className={styles.mainPanelDiv}>
                <Panel bordered>
                    <div className={styles.panel} >
                        <Logo fontSize={48} letterSpacing={-3} wordSpacing={`normal`} />
                        <p className={styles.nameTag}>A relationship for life </p>
                        <hr />
                        <h4 className={styles.nameTag}>Life Insurance </h4>
                    </div>
                </Panel>
                <Panel header="User Details" bordered>
                    <div id="userDetails" className={styles.panel} >
                        {session.user.name}
                    </div>
                </Panel>
            </div>
        </div>
    )
}