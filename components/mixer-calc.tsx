import React, {useEffect, useState} from 'react'; 


export default function InlineCalculator (props) {
    function useInput(label): [number, JSX.Element]{
        const [value, setValue] = useState(0); 
        const name: string = Math.random().toString(); 

        function handleChange(e: React.ChangeEvent<HTMLInputElement>): void{
            var newValue = parseFloat(e.target.value);
            newValue = newValue === NaN ? 0 : newValue;
            setValue(newValue);
        }
        const input = (
            <>
                <label htmlFor={label}>{label}</label>
                <input type='number' name={name} placeholder={label} value={value.toString()} onChange={e => handleChange(e)}></input>
            </>
        )
        return [value, input]
    }

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
            currentO2 = currentO2 || 0;
            desiredO2 = desiredO2 || 0;
            currentHe = currentHe || 0;
            desiredHe = desiredHe || 0;

            const totalGasToAdd: number = desiredBar - currentBar; 
            const deltaO2 = ((desiredO2/100)*desiredBar) - ((currentO2/100)*currentBar);
            const deltaHe = ((desiredHe/100)*desiredBar) - ((currentHe/100)*currentBar); 
            const deltaN2 = ((100-desiredO2-desiredHe)*desiredBar) - ((100-currentO2-currentHe)*currentBar);

            const checkTotal = totalGasToAdd === (deltaO2+deltaHe+deltaN2);

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
        <form>
            <fieldset>
                <legend> Current Mix </legend>
                {currentBarInput}
                {currentO2Input}
                {currentHeInput}
            </fieldset>
            <fieldset>
                <legend> Desired Mix</legend>
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

        <p>DISCLAIMER: Check your gases, save our asses. The gas you dive is your responsibility, and yours alone. </p>
        </>
    )
}