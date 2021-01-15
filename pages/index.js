import Head from 'next/head'
import InlineCalculator from '../components/mixer-calc'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Scuba Gas Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <InlineCalculator></InlineCalculator>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
