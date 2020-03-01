import { getValidCallback } from './helpers';

let url = null;

if (process.env.NODE_ENV === 'development') {
    url = "http://localhost:3000";    
}

export function getAllEditors(callback) {
    const requestOptions = {
        method: 'GET',
        headers: getHttpHeaders()
    };

    const validCallback = getValidCallback(callback);

    fetch(`${url}/editors`, requestOptions)
        .then(res => res.json())
        .then(json => validCallback(json));
}

export function getEditorByEmail(email, callback) {
    const requestOptions = {
        method: 'GET',
        headers: getHttpHeaders()
    }

    const validCallback = getValidCallback(callback);

    fetch(`${url}/editors?email=${email}`, requestOptions)
        .then(res => res.json())
        .then(json => validCallback(json));
}

export function createEditor(name, email, callback) {
    const requestOptions = {
        method: 'POST',
        headers: getHttpHeaders(),
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

export function updateEditor(id, name, email, callback) {
    const requestOptions = {
        method: 'PUT',
        headers: getHttpHeaders(),
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

export function deleteEditor(id, callback) {
    const requestOptions = {
        method: 'DELETE',
        headers: getHttpHeaders()
    };

    const validCallback = getValidCallback(callback);

    fetch(`${url}/editors?id=${id}`, requestOptions)
        .then(res => res.json())
        .then(json => validCallback(json))
}

function getHttpHeaders() {
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
}
