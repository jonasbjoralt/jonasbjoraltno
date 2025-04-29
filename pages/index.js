import React from 'react';
import Head from 'next/head'
import Page from '../page/page';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Dykkeverktøy</title>
        <link rel="icon" href="/whale.png" />
      </Head>

      <Page>
        <p>Lenker til verktøy: </p>
        <ul>
          <li>
            <Link href="/gas-mixer">
              <a>Blender</a>
            </Link>
          </li>
          <li>
            <Link href="/gas-limits">
              <a>Kalkulator</a>
            </Link>
          </li>
        </ul>
      </Page>
    </>
  )
}
