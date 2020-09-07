export const editorsAction = 'setEditors';
export function setEditors(editors) {
    return ({
        type: editorsAction,
        payload: editors
    });
}

export const editorTableIndexAction = 'setEditorTableIndex';
export function setEditorTableIndex(editorTableIndex) {
    return ({
        type: editorTableIndexAction,
        payload: editorTableIndex
    });
}

export const authTokenAction = 'setAuthToken';
export function setAuthToken(authToken) {
    return ({
        type: authTokenAction,
        payload: authToken
    });
}

export const authErrorAction = 'setAuthError';
export function setAuthError(authError) {
    return ({
        type: authErrorAction,
        payload: authError
    });
}
