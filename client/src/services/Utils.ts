export function getToday(): Date {
    const now = new Date();
    const toReturn = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
    );

    return toReturn;
}

export function removeTimeFromDate(date: Date): Date {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0,
        0
    );
}

export function parseInputNumber(data: string | number): number {
    try {
        if (typeof data === "number") {
            return data;
        }

        const toReturn = data.replace(",", "");
        return Number.parseFloat(toReturn);
    } catch (err) {
        throw new Error(`Cannot parse to float: ${data}`);
    }
}
