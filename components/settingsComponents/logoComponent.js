import Logo from '../logo/logo';
import styles from '../../styles/Settings.module.css';

export default function LogoComponent() {
    return <div className={styles.logoDiv}>
        <Logo fontSize={28} letterSpacing={-2} wordSpacing={`normal`} />
        <p className={styles.nameTag}>A relationship for life </p>
        <hr />
        <h5 className={styles.nameTag}>Life Insurance </h5>
        <hr />
    </div>;
}