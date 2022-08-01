import { Table } from 'rsuite';

import styles from '../../styles/Settings.module.css';

export default function ViewUserComponent(session) {
    const { Column, HeaderCell, Cell } = Table;

    const createRowData = rowIndex => {
        const randomKey = Math.floor(Math.random() * 9);
        const names = ['Hal', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert', 'Hazel'];
        const citys = [
            'Beijing',
            'Shanghai',
            'New Amieshire',
            'New Gust',
            'Lefflerstad',
            'East Catalina',
            'Ritchieborough',
            'Gilberthaven',
            'Eulaliabury'
        ];
        const emails = [
            'yahoo.com',
            'gmail.com',
            'hotmail.com',
            'outlook.com',
            'aol.com',
            'live.com',
            'msn.com',
            'yandex.com',
            'mail.ru'
        ];

        return {
            id: rowIndex + 1,
            name: names[randomKey],
            city: citys[randomKey],
            email: names[randomKey].toLocaleLowerCase() + '@' + emails[randomKey]
        };
    };

    const data = Array.from({ length: 20 }).map((_, index) => createRowData(index));
        
    return (
        <div className={styles.tableMainPanelDiv}>
            <h2>Users of Guardio Life Insurance</h2>
            <Table
                height={900}
                data={data}
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
