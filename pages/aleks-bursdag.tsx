import Head from 'next/head'
import React, { JSX } from 'react'

export default function GasMixer(): JSX.Element {
  return(
    <>
      <Head>
        <title>ÙwÚ Grattis! x'D </title>
        <link rel="icon" href="whale.png" />
      </Head>
      <main>

        <h1 style={{
          color: 'hotpink',
          fontSize: '3rem',
          textShadow: '2px 2px 5px yellow',
          fontFamily: '"Comic Sans MS", cursive, sans-serif',
          textAlign: 'center',
          margin: '20px 0'
        }}>
          Gratulerer med dagen! 🎉🎈
        </h1>
        <iframe 
          src="https://archive.org/embed/gnomed&amp;autoplay=1&amp;mute=0" 
          width="640" 
          height="480" 
          allowFullScreen={true} 
          style={{
            border: '5px solid hotpink',
            borderRadius: '15px',
            boxShadow: '0 0 20px magenta',
            margin: '20px auto',
            display: 'block'
          }}
        /> 
        </main>
    </>
  )
}