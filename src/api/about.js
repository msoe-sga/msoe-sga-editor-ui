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

export function getAboutPreview(googleToken, markdown) {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'POST',
            headers: getHttpHeaders(googleToken),
            body: JSON.stringify({
                text: markdown
            })
        };
        
        fetch(`${url}/about/preview`, requestOptions)
            .then(res => res.json())
            .then(json => resolve(json.result))
            .catch(err => reject(err));
    })
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
