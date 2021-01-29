export function metersToAta(meters: number): number{
    return (meters/10) + 1;
}

export function AtaToMeters(ata: number): number{
    return (ata - 1)*10; 
}

