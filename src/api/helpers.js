export function getValidCallback(callback) {
    let validCallback = callback;
    if (!callback) {
        validCallback = () => void(0);
    }
    return validCallback;
}

export function getHttpHeaders(googleToken) {
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${googleToken}`
    };
}
