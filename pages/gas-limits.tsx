import React from "react"; 
import { useEffect, useState } from 'react';
import Page from "../page/page";
import styles from '../styles/Form.module.css';
import mainStyles from '../styles/Home.module.css';
import { AtaToMeters, metersToAta } from '../utils/unitConversions';
import  { useCheckbox, useDropDown, useInput } from '../utils/useInput';

export default function GasLimits(props){
  const [oxygenPercent, oxygenInput] = useInput('Oksygen (%)');
  const [heliumPercent, heliumInput] = useInput('Helium (%)');
  const [currentDepth, currentDepthInput] = useInput('Aktuell dybde (m)');
  const [maxP02, maxP02Input] = useDropDown('Maks ppO2', ['1.6', '1.4', '1.2']); 
  const [o2Narcotic, o2NarcInput] = useCheckbox('Regn oksygen som narkotisk', true); 

  function narcoticFration() {
    return 1 - heliumPercent/100 - (o2Narcotic ? 0 : oxygenPercent/100)
  }

  function calculateMND(){
    const [mnd, setMND] = useState(0);
        
    useEffect(() => {
      const narcoticAta = 4 / narcoticFration();
      setMND(AtaToMeters(narcoticAta));
    },  [heliumPercent]);
    return mnd; 
  }

  function calculateMOD(){
    const [mod, setMOD] = useState(0);
        
    useEffect(() => {
      setMOD(parseFloat(maxP02)/(oxygenPercent/100))
    });
    return AtaToMeters(mod); 
  }

  function calculateEND(){
    const [end, setEND] = useState(0); 

    useEffect(() => {
      const narcoticAta = metersToAta(currentDepth) * narcoticFration(); 
      setEND(AtaToMeters(narcoticAta));
    });

    return end; 
  }

  const mnd = calculateMND(); 
  const mod = calculateMOD(); 
  const end = calculateEND(); 

  return (
    <>
      <head>
        <title>Gass-Kalkulator</title>
        <link rel="icon" href="/whale.png" />
      </head>
      <Page>
        <h1>Gass-Begrensinger</h1>
        <h2>Innstillinger</h2>
        <form className={styles.formContainer}>
          <fieldset className={styles.responsiveForm}>
            <legend>Sett paramtere</legend>
            {oxygenInput}
            {heliumInput}
            {currentDepthInput}
          </fieldset>
          <fieldset className={styles.responsiveForm}>
            <legend>Innstillinger</legend>
            {maxP02Input}
            {o2NarcInput}
          </fieldset>
        </form>

        <h2>Gass-begrensinger</h2>
        <table>
          <tr><td>Maks Operasjonell Dybde </td><td>{mod.toFixed(2)}</td></tr>
          <tr><td>Maks Narkotisk Dybde </td><td>{mnd.toFixed(2)}</td></tr>
          <tr><td>Ekvivalent Narkotisk Dybde</td><td>{end.toFixed(2)}</td></tr>
        </table>
      </Page>
    </>
  );
}