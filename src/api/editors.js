import { getValidCallback } from './helpers';

let url = null;

if (process.env.NODE_ENV === 'development') {
    url = "http://localhost:3000";    
}

export function getAllEditors(googleToken, callback) {
    const requestOptions = {
        method: 'GET',
        headers: getHttpHeaders(googleToken)
    };

    const validCallback = getValidCallback(callback);

    fetch(`${url}/editors`, requestOptions)
        .then(res => res.json())
        .then(json => validCallback(json));
}

export function createEditor(name, email, googleToken, callback) {
    const requestOptions = {
        method: 'POST',
        headers: getHttpHeaders(googleToken),
        body: JSON.stringify({
            'name': name,
            'email': email
        })
    };

    const validCallback = getValidCallback(callback);

    fetch(`${url}/editors`, requestOptions)
        .then(res => res.json())
        .then(json => validCallback(json));
}

export function updateEditor(id, name, email, googleToken, callback) {
    const requestOptions = {
        method: 'PUT',
        headers: getHttpHeaders(googleToken),
        body: JSON.stringify({
            'id': id,
            'name': name,
            'email': email
        })
    };

    const validCallback = getValidCallback(callback);
    
    fetch(`${url}/editors`, requestOptions)
        .then(res => res.json())
        .then(json => validCallback(json));
}

export function deleteEditor(id, googleToken, callback) {
    const requestOptions = {
        method: 'DELETE',
        headers: getHttpHeaders(googleToken)
    };

    const validCallback = getValidCallback(callback);

    fetch(`${url}/editors?id=${id}`, requestOptions)
        .then(res => res.json())
        .then(json => validCallback(json))
}

function getHttpHeaders(googleToken) {
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${googleToken}`
    };
}
