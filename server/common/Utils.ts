import { currency } from "./Constants";
export function getOrElse<T>(data: T, defaultVal: T | null = null): T | null {
    try {
        return data || defaultVal;
    } catch (err) {
        console.log(err);
        return defaultVal;
    }
}

export function formatAmount(input: number, c: currency): string {
    try {
        switch (c) {
            case currency.THB: {
                const amount = new Intl.NumberFormat("th-TH").format(input);
                return `THB ${amount}`;
            }
            case currency.USD: {
                const amount = new Intl.NumberFormat("en-EN").format(input);
                return `$${amount}`;
            }
            default:
                return "";
        }
    } catch (err) {
        console.log(err);
        return "";
    }
}
