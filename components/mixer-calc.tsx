/* eslint-disable prefer-const */
import React, {useEffect, useState} from 'react'; 
import styles from '../styles/Form.module.css';
import calculateBlenderSettings from '../utils/blender-calculations';
import { useInput } from '../utils/useInput';



export default function InlineCalculator (): JSX.Element {
  const [currentBar, currentBarInput] = useInput('Nåværende Trykk (Bar)'); 
  let [currentO2, currentO2Input] =     useInput('Nåværende Oksygen (%)'); 
  let [currentHe, currentHeInput] =     useInput('Nåværende Helium (%)'); 

  const [desiredBar, desiredBarInput] = useInput('Ønsket Trykk (Bar)'); 
  let [desiredO2, desiredO2Input] =     useInput('Ønsket Okygen (%)'); 
  let [desiredHe, desiredHeInput] =     useInput('Ønsket Helium (%)'); 

  function calculateBlender(): [number, number]{
    const [blenderO2, setBlenderO2] = useState<number>(0);
    const [blenderHe, setBlenderHe] = useState<number>(0);

    useEffect(() => {
      const [o2SetPoint, heSetPoint] = calculateBlenderSettings(
        {
          bars:currentBar,
          oxygenPercentage: currentO2,
          heliumPercentage: currentHe
        },{
          bars: desiredBar,
          oxygenPercentage: desiredO2,
          heliumPercentage: desiredHe
        }
      );

      if(desiredBar - currentBar > 0 && o2SetPoint > 0){
        setBlenderO2(o2SetPoint);
        setBlenderHe(heSetPoint);
      }
    }); 

    return [blenderO2, blenderHe]; 
  }

  function getWarnings(): string[]{
    let warnings = []; 

    if(blenderO2 > 40){
      warnings.push("Oksygen overstiger 40%");
    }

    if(blenderO2/(100-blenderHe) < 0.21){
      warnings.push(`Gassblandingen er ikke mulig. %O2 uten Helium er ${blenderO2/(100-blenderHe)}`);
    }
    
    return warnings; 
  }

  const [blenderO2, blenderHe] = calculateBlender(); 
  const warnings = getWarnings();
  return (
    <>
      <form className={styles.formContainer}>
        <fieldset className={styles.responsiveForm}>
          <legend> Nåværende Mix </legend>
          {currentBarInput}
          {currentO2Input}
          {currentHeInput}
        </fieldset>
        <fieldset className={styles.responsiveForm}>
          <legend> Ønsket Mix</legend>
          {desiredBarInput}
          {desiredO2Input}
          {desiredHeInput}
        </fieldset>
      </form>

      <p>Sett blenderen til: </p>
      <ul>
        <li>O2: {blenderO2.toFixed(2)}%</li>
        {blenderHe > 0 && <li>He: {blenderHe.toFixed(2)}%</li>}            
      </ul>
      {(warnings.length > 0 && blenderO2 > 0) && (
        <>
          <p className={styles.warningText}>Advarsel:</p>
          <ul>
            {warnings.map((item, index) => (<li key={index}>{item}</li>))}
          </ul>
        </>
      )}

      <p>Sjekk at gassen stemmer, og er mulig! For eksempel kan oksygen-komponenten være under 21%. Isåfall vil ikke gassen mulig å oppnå uten å tømme litt ut av flasken. 
          Denne kalkulatoren tar ikke høyde for at prosenter overstiger 100% og så videre. Bruk hodet og tenk sjæl. </p>
      <p>DISCLAIMER: Sjekk og analyser gassen! Ikke stol på rare verktøy på nett. Vær også obs på kompressorens begrensninger på O2. </p>
    </>
  )
}