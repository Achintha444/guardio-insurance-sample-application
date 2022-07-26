import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import homeImage from '../public/home.jpeg'
import { Button } from 'rsuite'

import "rsuite/dist/rsuite.min.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Guardio Insurance</title>
        <meta name="description" content="Guardio Insurance" />
      </Head>

      <main className={styles.main}>

        <div className={styles.homeImageDiv}>
          <Image src={homeImage} className={styles.homeImage} alt="home image"/>
        </div>

        <div className={styles.signInDiv}>
          <h1><span>Guardio</span> Insurance</h1>
          <p className={styles.nameTag}>A relationship for life </p>
          <hr />
          <p className={styles.buttonTag}>Let's get your journey started. </p>
          <Button className={styles.signInDivButton} size="lg" appearance='primary'>Sign In</Button>
        </div>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
