import React, {useEffect, useState} from 'react'; 
import styles from '../styles/Form.module.css';
import { useInput } from '../utils/useInput';



export default function InlineCalculator (props) {
    let [currentBar, currentBarInput] = useInput('Current Pressure (Bar)'); 
    let [currentO2, currentO2Input] = useInput('Current Oxygen (%)'); 
    let [currentHe, currentHeInput] = useInput('Current Helium (%)'); 

    let [desiredBar, desiredBarInput] = useInput('Desired Pressure (Bar)'); 
    let [desiredO2, desiredO2Input] = useInput('Desired Oxygen (%)'); 
    let [desiredHe, desiredHeInput] = useInput('Desired Helium (%)'); 

    function calculateBlender(){
        const [blenderO2, setBlenderO2] = useState<Number>(0);
        const [blenderHe, setBlenderHe] = useState<Number>(0);

        useEffect(() => {
            currentO2 = currentO2/100 || 0;
            desiredO2 = desiredO2/100 || 0;
            currentHe = currentHe/100 || 0;
            desiredHe = desiredHe/100 || 0;

            const totalGasToAdd: number = desiredBar - currentBar; 
            const deltaO2 = ((desiredO2)*desiredBar) - ((currentO2)*currentBar);
            const deltaHe = ((desiredHe)*desiredBar) - ((currentHe)*currentBar); 
            const deltaN2 = ((1-desiredO2-desiredHe)*desiredBar) - ((1-currentO2-currentHe)*currentBar);

            const sumDelta = deltaO2 + deltaHe + deltaN2;

            const checkTotal = totalGasToAdd === sumDelta;

            console.log(deltaO2);

            if(totalGasToAdd > 0 && deltaO2 > 0){
                setBlenderO2(((deltaO2/totalGasToAdd)*100));
                setBlenderHe(((deltaHe/totalGasToAdd)*100));
            }
        }); 
        return [blenderO2, blenderHe]; 
    }

    const [blenderO2, blenderHe] = calculateBlender(); 

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

        <p>DISCLAIMER: Sjekk og analyser gassen! Ikke stol på rare verktøy på nett. Vær også obs på kompressorens begrensninger på O2. </p>
        </>
    )
}