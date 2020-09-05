import { getHttpHeaders } from './helpers';

let url = null;

if (process.env.NODE_ENV === 'development') {
    url = "http://localhost:3000";    
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
        
        fetch(`${url}/preview`, requestOptions)
            .then(res => res.json())
            .then(json => resolve(json.result))
            .catch(err => reject(err));
    })
}