import { decode as base64decode } from 'base-64';

global.atob = base64decode;

export function hasExpiredToken(token) {
    const { exp } = JSON.parse(atob(token.split('.')[1]));
const currentDate = new Date().getDate();

if(exp <= currentDate) {
    return true;
}
    return false;
}