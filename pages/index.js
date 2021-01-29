import Head from 'next/head'
import InlineCalculator from '../components/mixer-calc'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blender-Kalkulator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Dykkegass-verktøy 
        </h1>
        <p> Obs! Husk at hva du dykker med, og puster er ditt eget ansvar. Ikke stol blindt på alt du finner på nettet. </p>
        <ul>
          Tilgjengelige verktøy:
          <li>
            <a href='/gas-mixer'> Gass-Blender med mixer </a>
          </li>
          <li>
            <a href='/gas-limits'> Gass-kalkulator </a>
          </li>
        </ul>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
