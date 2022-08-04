import { Table } from 'rsuite';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { usersDetails } from '../../util/apiDecode';
import { fetchUsers } from '../../util/apiCall';

import styles from '../../styles/Settings.module.css';
import { consoleLogDebug } from '../../util/util';
import EditUserComponent from '../editUser/editUserComponent';

export default function ViewUserComponent(props) {
    const [users, setUsers] = useState([]);
    const [editUserOpen, setEditUserOpen] = useState(false);

    const [openUser, setOpenUser] = useState({});

    useLayoutEffect(() => {
        async function fetchData() {
            const res1 = await usersDetails(props.session);
            setUsers(res1);
        }
        fetchData();
    },[props]);

    const { Column, HeaderCell, Cell } = Table;

    const closeEditDialog = () => {
        setOpenUser({});
        setEditUserOpen(false);
    } 

    const onEditClick = (user)=>{
        setOpenUser(user);
        setEditUserOpen(true);
    }
    
    return (
        <div className={styles.tableMainPanelDiv}>
            <EditUserComponent session={props.session} open={editUserOpen} onClose={closeEditDialog} user={openUser}/>
            <h2>Users of Guardio Life Insurance</h2>
            <Table
                height={900}
                data = {users}
            >
                <Column width={300} align="center" fixed>
                    <HeaderCell><h6>Id</h6></HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column width={200} align="center">
                    <HeaderCell><h6>User Name</h6></HeaderCell>
                    <Cell dataKey="username" />
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
                    <HeaderCell><h6>Edit User</h6></HeaderCell>

                    <Cell>
                        {rowData => (
                            <span>
                                <a onClick={() => onEditClick(rowData)} style={{cursor:'pointer'}}> Edit </a>
                            </span>
                        )}
                    </Cell>
                </Column>
            </Table>
        </div>

    )
}
