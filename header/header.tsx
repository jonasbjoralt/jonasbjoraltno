import React, { useEffect, useState } from "react";
import Link from "next/link";
import css from "./header.module.scss"; 
import { useMediaPredicate } from "react-media-hook";
import Image from "next/image";

export default function Header(): JSX.Element {
  const [isNavVisible, setIsNavVisible] = useState(false); 
  const isSmallScreen = useMediaPredicate("(max-width: 900px)");

  function toggleNav(): void {
    setIsNavVisible(!isNavVisible); 
  }

  console.log(!isSmallScreen || isNavVisible);

  return(
    <header className={css.header}>
      <Link href="/">
        <a>
          <h2 className={css.mainPageLink}>Dykkeverktøy</h2>
        </a>
      </Link>
      {(!isSmallScreen || isNavVisible) && 
      <nav className={css.navigation}>
        <Link href="/gas-mixer">
          <a>Blender</a>
        </Link>
        <Link href="/gas-limits">
          <a>Kalkulator</a>
        </Link>
      </nav>
      }
      {isSmallScreen && 
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