import { getValidCallback, getHttpHeaders, getApiUrl } from './helpers';

const url = getApiUrl();

export function getAllPosts(googleToken, callback) {
	const requestOptions = {
		method: 'GET',
		headers: getHttpHeaders(googleToken)
	};

	const validCallback = getValidCallback(callback);

	fetch(`${url}/posts`, requestOptions)
		.then(res => res.json())
		.then(json => validCallback(json));
}

export function createPost(text, author, title, googleToken, callback) {
	const requestOptions = {
		method: 'POST',
		headers: getHttpHeaders(googleToken),
		body: JSON.stringify({
			'text': text,
			'author': author,
			'title': title
		})
	};

	const validCallback = getValidCallback(callback);

        fetch(`${url}/posts`, requestOptions)
                .then(res => res.json())
                .then(json => validCallback(json));
}

export function editPost(text, author, title, path, ref, googleToken, callback) {
	 const requestOptions = {
                method: 'PUT',
                headers: getHttpHeaders(googleToken),
                body: JSON.stringify({
                        'text': text,
                        'author': author,
                        'title': title,
			'path': path,
			'rev': ref
                })
        };

        const validCallback = getValidCallback(callback);

        fetch(`${url}/posts`, requestOptions)
                .then(res => res.json())
                .then(json => validCallback(json));
}

