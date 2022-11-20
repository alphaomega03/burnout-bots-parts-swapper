import Head from 'next/head'
import Image from 'next/image'
import ConnectMint from '../components/ConnectMint'
import styles from '../styles/Home.module.css'


export default function App() {
  return (
    <div className={styles.container}>
    <Head>
      <title>Burnout Bots</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
      <link href='https://fonts.googleapis.com/css?family=Press+Start+2P' rel='stylesheet' type='text/css'></link>
      {/* <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" /> */}
    </Head>

    <main className={styles.main}>
      <div className={styles.grid}>
        <ConnectMint />
      </div>
    </main>
  </div>
    
  )
}