export const currencyToNumber = (currency: string) : number => Number(currency.replace(/[^0-9.-]+/g, ""));
