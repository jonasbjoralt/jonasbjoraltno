import Head from 'next/head'
import React, { JSX } from 'react'
import InlineCalculator from '../components/mixer-calc'
import Page from '../page/page'

export default function GasMixer(): JSX.Element {
  return(
    <>
      <Head>
        <title>Blender-Kalkulator</title>
        <link rel="icon" href="whale.png" />
      </Head>

      <Page>
        <h2>
          Gass-Blender
        </h2>
        <p> Sett inn din nåværende gass, og ønsket gass under. Designet for inline-blender </p>
        <InlineCalculator></InlineCalculator>
      </Page>
    </>
  )
}
