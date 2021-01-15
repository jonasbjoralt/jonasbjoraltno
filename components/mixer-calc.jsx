import React, {useEffect, useState} from 'react'; 

export default function InlineCalculator (props) {

    function useInput(label){
        const [value, setValue] = useState(0); 
        const name = Math.random().toString(); 
        const input = (
            <>
                <label htmlFor={label}>{label}</label>
                <input type='number' name={name} placeholder={label} value={value} onChange={e => setValue(e.target.value)}></input>
            </>
        )
        return [value, input]
    }

    const [currentBar, currentBarInput] = useInput('Current Pressure (Bar)'); 
    const [currentO2, currentO2Input] = useInput('Current Oxygen (%)'); 
    const [currentHe, currentHeInput] = useInput('Current Helium (%)'); 

    const [desiredBar, desiredBarInput] = useInput('Desired Pressure (Bar)'); 
    const [desiredO2, desiredO2Input] = useInput('Desired Oxygen (%)'); 
    const [desiredHe, desiredHeInput] = useInput('Desired Helium (%)'); 

    function calculateBlender(){
        const [blenderO2, setBlenderO2] = useState(0);
        const [blenderHe, setBlenderHe] = useState(0);

        useEffect(() => {
            const totalGasToAdd = desiredBar - currentBar; 
            const deltaO2 = ((desiredO2/100)*desiredBar) - ((currentO2/100)*currentBar);
            const deltaHe = ((desiredHe/100)*desiredBar) - ((currentHe/100)*currentBar); 
            const deltaN2 = ((100-desiredO2-desiredHe)*desiredBar) - ((100-currentO2-currentHe)*currentBar);

            const checkTotal = totalGasToAdd === (deltaO2+deltaHe+deltaN2);

            console.log(deltaO2);


            setBlenderO2(((deltaO2/totalGasToAdd)*100).toFixed(2));
            setBlenderHe(((deltaHe/totalGasToAdd)*100).toFixed(2));
        }); 
        return [blenderO2, blenderHe, '']; 
    }

    const [blenderO2, blenderHe, blenderError] = calculateBlender(); 

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

        <p>Set blender to: {blenderO2}/{blenderHe} </p>
        </>
    )
}