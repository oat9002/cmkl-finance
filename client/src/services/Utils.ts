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
