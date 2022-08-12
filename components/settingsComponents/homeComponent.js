import { Panel } from 'rsuite';
import Image from 'next/image'
import Logo from '../logo/logo';
import styles from '../../styles/Settings.module.css';
import profileImage from '../../public/profile.svg'
import "rsuite/dist/rsuite.min.css";

import React, { useEffect, useLayoutEffect, useState } from 'react'
import { meDetails } from '../../util/apiDecode';
import { consoleLogDebug } from '../../util/util';

import { fetchUsers } from '../../util/apiCall';

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
            <Panel header="User Details" bordered>
                <div id="userDetails" className={styles.homePanel}>
                    {
                        me == null ?
                            <p className={styles.userNullText}>
                                Error Occured when getting user details. <br />Try Again
                            </p>
                            :
                            userDetailsBody(me)
                    }
                </div>
            </Panel>
        </div>
    );
}

function userDetailsBody(me) {
    return (
        <div className={styles.userDetails}>
            <div className={styles.userDetailsBody}>
                <p><b>First Name : </b>{me.name}</p>
                <p><b>ID : </b>{me.id}</p>
                <p><b>Username : </b>{me.username}</p>
                <p><b>Email : </b>{me.email}</p>
            </div>
            <div className={styles.profileImage}>
                <Image src={profileImage} alt="profile image" />
            </div>

        </div>
    );
}
