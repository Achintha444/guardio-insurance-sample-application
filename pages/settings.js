import React from 'react';
import { Panel, Placeholder } from 'rsuite';
import styles from '../styles/Settings.module.css';
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';


import "rsuite/dist/rsuite.min.css";
import Logo from '../components/logo/logo';

export default function settings() {

    return (
        <div className={styles.mainDiv}>
            <div className={styles.sideNavDiv}>
                <Sidenav className={styles.sideNav} defaultOpenKeys={['3', '4']}>
                    <Sidenav.Body>
                        <div className={styles.logoDiv}>
                            <Logo fontSize={28} letterSpacing={-2} wordSpacing={`normal`} />
                            <p className={styles.nameTag}>A relationship for life </p>
                            <hr />
                            <h5 className={styles.nameTag}>Life Insurance </h5>
                            <hr />
                        </div>
                        <Nav activeKey="1">
                            <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                                Dashboard
                            </Nav.Item>
                            <Nav.Item eventKey="2" icon={<GearCircleIcon />}>
                                Settings
                            </Nav.Item>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
            <div className={styles.mainPanelDiv}>
                <Panel header="Panel title" bordered>
                    <Placeholder.Paragraph />
                </Panel>
            </div>
        </div>
    )
}