type GasFill = {
    bars: number;
    oxygenPercentage: number;
    heliumPercentage: number;
}; 

function calculateSetPoint(
  desiredBars: number, currentBars: number, desiredFraction:number, currentFraction:number): number{
  const totalGasToAdd: number = desiredBars - currentBars;
  const deltaBars = (desiredFraction*desiredBars) - (currentFraction*currentBars); 
  return parseFloat(((deltaBars/totalGasToAdd)*100).toFixed(1));
}

export default function calculateBlenderSettings(currentFill: GasFill, desiredFill: GasFill): [number, number] {
  const currentO2 = currentFill.oxygenPercentage/100 || 0;
  const desiredO2 = desiredFill.oxygenPercentage/100 || 0;
  const currentHe = currentFill.heliumPercentage/100 || 0;
  const desiredHe = desiredFill.heliumPercentage/100 || 0;

  return [
    calculateSetPoint(desiredFill.bars, currentFill.bars, desiredO2, currentO2), 
    calculateSetPoint(desiredFill.bars, currentFill.bars, desiredHe, currentHe)];
}