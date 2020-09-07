import { getHttpHeaders, getApiUrl } from './helpers';

const url = getApiUrl();

export function getKramdownPreview(googleToken, markdown) {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'POST',
            headers: getHttpHeaders(googleToken),
            body: JSON.stringify({
                text: markdown
            })
        };
        
        fetch(`${url}/preview`, requestOptions)
            .then(res => res.json())
            .then(json => resolve(json.result))
            .catch(err => reject(err));
    })
}