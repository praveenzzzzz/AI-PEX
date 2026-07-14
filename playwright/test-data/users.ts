import { USERS } from '../constants/constants';

export const users = {

    validUser: {
        email: USERS.VALID_EMAIL,
        password: USERS.VALID_PASSWORD
    },

    invalidUser: {
        email: USERS.INVALID_EMAIL,
        password: USERS.INVALID_PASSWORD
    }

};
