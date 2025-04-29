import React, { useState } from "react";
import Link from "next/link";
import css from "./header.module.scss"; 
import Image from "next/image";

export default function Header(): JSX.Element {
  const [isNavVisible, setIsNavVisible] = useState(false); 

  function toggleNav(): void {
    setIsNavVisible(!isNavVisible); 
  }

  console.log(isNavVisible);

  return(
    <header className={css.header}>
      <Link href="/">
        <a>
          <h2 className={css.mainPageLink}>Dykkeverktøy</h2>
        </a>
      </Link>
      {(isNavVisible) && 
      <nav className={css.navigation}>
        <Link href="/gas-mixer">
          <a>Blender</a>
        </Link>
        <Link href="/gas-limits">
          <a>Kalkulator</a>
        </Link>
      </nav>
      }
      {
                <button onClick={toggleNav} className={css.navToggle}>
                  <Image
                    src="/hamburger.svg"
                    alt="Menu Icon"
                    width={32}
                    height={32}
                  />
                </button>
      }
    </header>
  )
}