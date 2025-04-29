import {JSX, useState} from 'react';
    
export function useInput(label: string): [number, JSX.Element]{
  const [value, setValue] = useState(0); 
  const name: string = Math.random().toString(); 

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void{
    let newValue = parseFloat(e.target.value);
    newValue = Number.isNaN(newValue) ? 0 : newValue;
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

export function useCheckbox(label: string, def?: boolean): [boolean, JSX.Element]{
  const [value, setValue] = useState<boolean>(def ? def : true); 
  const name: string = Math.random().toString(); 

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void{
    const newValue = e.target.checked;
    setValue(newValue);
  }
  const input = (
    <>
      <label htmlFor={label}>{label}</label>
      <input type='checkbox' name={name} placeholder={label} onChange={e => handleChange(e)} checked={value}></input>
    </>
  )
  return [value, input]
}

export function useDropDown(label: string, options: string[]): [string, JSX.Element]{
  const [selected, setSelected] = useState(options[0]); 
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void{
    const value = e.target.value; 
    setSelected(value); 
  }

  const input = (
    <label> {label}
      <select value={selected} onChange={e => handleChange(e)}>
        {options.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </label>
  )

  return [selected, input]; 
}
