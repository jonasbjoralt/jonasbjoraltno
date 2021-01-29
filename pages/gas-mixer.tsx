import Head from 'next/head'
import InlineCalculator from '../components/mixer-calc'
import styles from '../styles/Home.module.css'

export default function GasMixer() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blender-Kalkulator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Inline-Blender kalkulator
        </h1>
        <p> Sett inn din nåværende gass, og ønsket gass under.  </p>

        <InlineCalculator></InlineCalculator>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
