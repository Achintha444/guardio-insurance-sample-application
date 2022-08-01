import { Panel } from 'rsuite';
import Logo from '../logo/logo';
import styles from '../../styles/Settings.module.css';

export default function HomeComponent(session) {
    return <div className={styles.homeMainPanelDiv}>
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
                {session.user.name}
            </div>
        </Panel>
    </div>;
}