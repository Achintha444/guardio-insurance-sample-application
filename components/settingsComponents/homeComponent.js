import { Panel } from 'rsuite';
import Image from 'next/image'
import Logo from '../logo/logo';
import styles from '../../styles/Settings.module.css';
import profileImage from '../../public/profile.svg'

import React, { useEffect, useState } from 'react'
import { meDetails } from '../../util/apiDecode';

export default function HomeComponent(session) {

    const [me, setMe] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const res = await meDetails(session);
            setMe(res);
        }
        fetchData();
    }, []);

    return (
        <div className={styles.homeMainPanelDiv}>
            <Panel bordered>
                <div className={styles.homePanel}>
                    <Logo fontSize={48} letterSpacing={-3} wordSpacing={`normal`} />
                    <p className={styles.nameTag}>A relationship for life </p>
                    <hr />
                    <h4 className={styles.nameTag}>Life Insurance </h4>
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
                <p><b>ID : </b>{me.id}</p>
                <p><b>Username : </b>{me.userName}</p>
                <p><b>Name : </b>{me.name}</p>
                <p><b>Email : </b>{me.email}</p>
            </div>
            <div className={styles.profileImage}>
                <Image src={profileImage}  alt="profile image"/>
            </div>
            
        </div>
    );
}
