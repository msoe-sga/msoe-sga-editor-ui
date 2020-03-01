export function getValidCallback(callback) {
    let validCallback = callback;
    if (!callback) {
        validCallback = () => void(0);
    }
    return validCallback;
}
