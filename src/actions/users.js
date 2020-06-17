

export const CHANGE_AUTHORED_USER = 'CHANGE_AUTHORED_USER';


export function changeAuthedUser(authedUserID) {
    return {
        type: CHANGE_AUTHORED_USER,
        authedUserID,
    }
}

