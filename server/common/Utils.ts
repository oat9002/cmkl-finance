export function getOrElse<T>(data: T, defaultVal: T | null = null): T | null {
    try {
        return data || defaultVal;
    } catch (err) {
        console.log(err);
        return defaultVal;
    }
}
