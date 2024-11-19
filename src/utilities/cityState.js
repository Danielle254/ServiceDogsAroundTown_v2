export default function cityState(string) {
    return string.slice(string.indexOf(',') + 2, string.length - 10);
}