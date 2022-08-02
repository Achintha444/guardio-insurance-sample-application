import { Table } from 'rsuite';
import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../util/apiCall';

import styles from '../../styles/Settings.module.css';
import { consoleLogDebug } from '../../util/util';

export default function ViewUserComponent(session) {
    const [users, setUsers] = useState(null);

    // const fetchData = async()=> {
    //     const res = await fetchUsers(session);
    //     consoleLogDebug(res);
    //     setUsers(res);
    // }

    // fetchData();

    useEffect(() => {
        async function fetchData() {
            const res1 = await fetchUsers(session);
            setUsers(res1);
        }
        fetchData();
    }, []);

    const { Column, HeaderCell, Cell } = Table;
    
    console.log("test123");

    consoleLogDebug("view user",users);
        
    return (
        <div className={styles.tableMainPanelDiv}>
            <h2>Users of Guardio Life Insurance</h2>
            <Table
                height={900}
                onRowClick={rowData => {
                    console.log(rowData);
                }}
            >
                <Column width={300} align="center" fixed>
                    <HeaderCell>Id</HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column width={300}>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="firstName" />
                </Column>

                <Column width={300}>
                    <HeaderCell>Email</HeaderCell>
                    <Cell dataKey="email" />
                </Column>
                <Column width={80} fixed="right">
                    <HeaderCell>...</HeaderCell>

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
