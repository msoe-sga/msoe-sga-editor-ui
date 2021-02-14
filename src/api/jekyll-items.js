import { getValidCallback, getHttpHeaders, getApiUrl } from './helpers';

const url = getApiUrl();

export function getJekyllItem(googleToken, type, filePath, callback) {
    const requestOptions = {
        method: 'GET',
        headers: getHttpHeaders(googleToken)
    };

    const validCallback = getValidCallback(callback);

    fetch(`${url}/items?type=${type}&file_path=${filePath}`, requestOptions)
        .then(res => res.json())
        .then(json => validCallback(json));
}

export function getKramdownPreview(googleToken, markdown) {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'POST',
            headers: getHttpHeaders(googleToken),
            body: JSON.stringify({
                text: markdown
            })
        };
        
        fetch(`${url}/items/preview`, requestOptions)
            .then(res => res.json())
            .then(json => resolve(json.result))
            .catch(err => reject(err));
    })
}

export function createJekyllItem(googleToken, type, props, callback) {
    const requestOptions = {
        method: 'PUT',
        headers: getHttpHeaders(googleToken),
        body: JSON.stringify({
            type: type,
            properties: props
        })
    };

    const validCallback = getValidCallback(callback);

    fetch(`${url}/items`, requestOptions)
        .then(res => res.json())
        .then(json => validCallback(json));
}

export function editJekyllItem(googleToken, type, ref, editedProps, callback) {
    const requestOptions = {
        method: 'PUT',
        headers: getHttpHeaders(googleToken),
        body: JSON.stringify({
            type: type,
            ref: ref,
            properties: editedProps
        })
    };

    const validCallback = getValidCallback(callback);

    fetch(`${url}/items`, requestOptions)
        .then(res => res.json())
        .then(json => validCallback(json));
}
