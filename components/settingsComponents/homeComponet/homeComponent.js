import { FlexboxGrid, Panel } from 'rsuite';
import Image from 'next/image'
import Logo from '../../logo/logo';
import styles from '../../../styles/Settings.module.css';
import profileImage from '../../../public/profile.svg'
import "rsuite/dist/rsuite.min.css";

import React, { useEffect, useLayoutEffect, useState } from 'react'
import { meDetails } from '../../../util/apiDecode';
import { hideBasedOnScopes } from '../../../util/util';

import { fetchUsers } from '../../../util/apiCall';
import UserDetails from './userDetails';
import LatestNewsComponent from './latestNewsComponent';

export default function HomeComponent(props) {

    const [me, setMe] = useState(null);

    // const fetchData = async()=> {
    //     const res = await meDetails(props.session);
    //     setMe(res);
    // }

    // fetchData();

    useEffect(() => {
        async function fetchData() {
            const res = await meDetails(props.session);
            setMe(res);
        }
        fetchData();
    }, [props]);

    return (
        <div className={styles.homeMainPanelDiv}>
            <Panel bordered>
                <div className={styles.homePanel}>
                    <Logo fontSize={48} letterSpacing={-3} wordSpacing={`normal`} />
                    <p className={styles.nameTag}>A relationship for life </p>
                    <hr />
                    <h4 className={styles.nameTag}>{props.orgName}</h4>
                </div>
            </Panel>
            {
                me == null ?
                    <></> :
                    <Panel header="User Details" bordered>
                        <div id="userDetails" className={styles.homePanel}>
                            <UserDetails me={me} session={props.session} />
                        </div>
                    </Panel>
            }

            <LatestNewsComponent />
        </div>
    );
}