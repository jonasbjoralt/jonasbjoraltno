import React from "react";
import Footer from "../footer/footer";
import Header from "../header/header"
import css from "./page.module.scss";


type PageProps = {
    children: React.ReactNode
}

export default function Page(props: PageProps): JSX.Element {

  return (
    <div id={css.body}>
      <Header/>
      <div id={css.content}>
        {props.children}
      </div>
      <Footer/>
    </div>
  );
}