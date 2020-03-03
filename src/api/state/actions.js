export const editorsAction = 'setEditors';
export function setEditors(editors) {
    return ({
        type: editorsAction,
        payload: editors
    });
}
