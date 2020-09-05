import { getValidCallback, getHttpHeaders } from './helpers';

let url = null;

if (process.env.NODE_ENV === 'development') {
    url = "http://localhost:3000";    
} else if (process.env.NODE_ENV === 'staging') {
    url = "https://msoe-sg-editor-api-staging.herokuapp.com";
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

export function editAboutPageOnMaster(googleToken, markdown, callback) {
    const requestOptions = {
        method: 'PUT',
        headers: getHttpHeaders(googleToken),
        body: JSON.stringify({
            text: markdown
        })
    };

    const validCallback = getValidCallback(callback);

    fetch(`${url}/about`, requestOptions)
        .then(res => res.json())
        .then(json => validCallback(json));
}

export function editPageOnBranch(googleToken, markdown, ref, callback) {
    const requestOptions = {
        method: 'PUT',
        headers: getHttpHeaders(googleToken),
        body: JSON.stringify({
            text: markdown,
            ref: ref
        })
    };

    const validCallback = getValidCallback(callback);

    fetch(`${url}/about`, requestOptions)
        .then(res => res.json())
        .then(json => validCallback(json));
}
