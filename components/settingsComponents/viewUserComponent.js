import { Table } from 'rsuite';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { usersDetails } from '../../util/apiDecode';
import { fetchUsers } from '../../util/apiCall';

import styles from '../../styles/Settings.module.css';
import { consoleLogDebug } from '../../util/util';

export default function ViewUserComponent(props) {
    const [users, setUsers] = useState([]);

    // const fetchData = async()=> {
    //     const res = await fetchUsers(props.session);
    //     consoleLogDebug(res);
    //     setUsers(res);
    // }

    // fetchData();

    useLayoutEffect(() => {
        console.log(props);
        async function fetchData() {
            const res1 = await usersDetails(props.session);
            setUsers(res1);
        }
        fetchData();
    },[props]);

    const { Column, HeaderCell, Cell } = Table;
    
    console.log("test123");

    consoleLogDebug("view user",users);
        
    return (
        <div className={styles.tableMainPanelDiv}>
            <h2>Users of Guardio Life Insurance</h2>
            <Table
                height={900}
                data = {users}
                onRowClick={rowData => {
                    console.log(rowData);
                }}
            >
                <Column width={300} align="center" fixed>
                    <HeaderCell><h6>Id</h6></HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column width={200} align="center">
                    <HeaderCell><h6>User Name</h6></HeaderCell>
                    <Cell dataKey="userName" />
                </Column>

                <Column width={200} align="center">
                    <HeaderCell><h6>Name</h6></HeaderCell>
                    <Cell dataKey="name" />
                </Column>

                <Column width={300} align="center">
                    <HeaderCell><h6>Email</h6></HeaderCell>
                    <Cell dataKey="email" />
                </Column>
                <Column width={80} align="center" fixed="right">
                    <HeaderCell><h6>...</h6></HeaderCell>

                    <Cell>
                        {rowData => (
                            <span>
                                <a onClick={() => alert(`id:${rowData.id}`)}> Edit </a>
                            </span>
                        )}
                    </Cell>
                </Column>
            </Table>
        </div>

    )
}
