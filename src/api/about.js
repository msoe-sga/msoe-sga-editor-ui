import { getValidCallback, getHttpHeaders } from './helpers';

let url = null;

if (process.env.NODE_ENV === 'development') {
    url = "http://localhost:3000";    
}

export function getAboutPage(googleToken, callback) {
    const requestOptions = {
        method: 'GET',
        headers: getHttpHeaders(googleToken)
    };

    const validCallback = getValidCallback(callback);

    fetch(`${url}/about`, requestOptions)
        .then(res => res.json())
        .then(json => validCallback(json));
}
